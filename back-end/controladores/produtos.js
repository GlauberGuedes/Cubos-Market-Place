const conexao = require("../conexao");
const {
  validarProduto,
  validarProdutoDaAtualizacao,
} = require("../validacao/produtos");

const listarProdutos = async (req, res) => {
  const { categoria } = req.query;
  const { usuario } = req;

  try {
    if (categoria) {
      const query =
        "select * from produtos where categoria = $1 and usuario_id = $2";
      const produtoFiltrado = await conexao.query(query, [
        categoria,
        usuario.id,
      ]);

      return res.status(200).json(produtoFiltrado.rows);
    }

    const query = "select * from produtos where usuario_id = $1";
    const produtos = await conexao.query(query, [usuario.id]);
    res.status(200).json(produtos.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;

  try {
    const queryProduto =
      "select * from produtos where id = $1 and usuario_id = $2";
    const produto = await conexao.query(queryProduto, [id, usuario.id]);

    if (produto.rowCount === 0) {
      return res.status(404).json("Produto não encontrado.");
    }

    res.status(200).json(produto.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
  const { usuario } = req;

  const ErroNaValidacaoDoProduto = validarProduto(
    nome,
    estoque,
    preco,
    descricao
  );

  if (ErroNaValidacaoDoProduto) {
    return res.status(400).json(ErroNaValidacaoDoProduto);
  }

  try {
    const query = `insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) 
    values ($1, $2, $3, $4, $5, $6, $7)`;
    const produtoCadastrado = await conexao.query(query, [
      usuario.id,
      nome,
      estoque,
      categoria,
      preco,
      descricao,
      imagem,
    ]);

    if (produtoCadastrado.rowCount === 0) {
      return res.status(400).json("Produto não foi cadastrado.");
    }

    res.status(200).json("Produto cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { nome, estoque, preco, descricao, imagem } = req.body;
  const { id } = req.params;
  const { usuario } = req;

  const ErroNaValidacaoDaAtualizacaoDoProduto = validarProdutoDaAtualizacao(
    nome,
    descricao,
    imagem
  );

  if (ErroNaValidacaoDaAtualizacaoDoProduto) {
    return res.status(400).json(ErroNaValidacaoDaAtualizacaoDoProduto);
  }

  try {
    const queryProdutoExistente =
      "select * from produtos where id = $1 and usuario_id = $2";
    const produtoExistente = await conexao.query(queryProdutoExistente, [
      id,
      usuario.id,
    ]);

    if (produtoExistente.rowCount === 0) {
      return res.status(404).json("Produto não encontrado.");
    }
    const produto = produtoExistente.rows[0];

    const nomeAtualizado = nome || produto.nome;
    const estoqueAtualizado = estoque || produto.estoque;
    const precoAtualizado = preco || produto.preco;
    const descricaoAtualizada = descricao || produto.descricao;
    const imagemAtualizada = imagem || produto.imagem;

    const queryProdutoAtualizado = `update produtos set nome = $1, estoque = $2, preco = $3, 
    descricao = $4, imagem = $5 where id = $6 and usuario_id = $7`;
    const produtoAtualizado = await conexao.query(queryProdutoAtualizado, [
      nomeAtualizado,
      estoqueAtualizado,
      precoAtualizado,
      descricaoAtualizada,
      imagemAtualizada,
      id,
      usuario.id,
    ]);

    if (produtoAtualizado.rowCount === 0) {
      return res.status(400).json("Não foi possível atualizar produto.");
    }

    res.status(200).json("Produto atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;

  try {
    const query = "select * from produtos where id = $1 and usuario_id = $2";
    const produto = await conexao.query(query, [id, usuario.id]);

    if (produto.rowCount === 0) {
      return res.status(404).json("Produto não encontrado.");
    }

    const queryDeletar =
      "delete from produtos where id = $1 and usuario_id = $2";
    const produtoDeletado = await conexao.query(queryDeletar, [id, usuario.id]);

    if (produtoDeletado.rowCount === 0) {
      return res.status(400).json("Não foi possível excluir o produto.");
    }

    res.status(200).json("Produto deletado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
};
