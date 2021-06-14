const conexao = require("../conexao");
const { validarProduto } = require("../utils/validacao/produtos");
const atualizarProdutoUsuario = require("../utils/atualizacao/produtos");

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

  const produtoNaoValidado = validarProduto(nome, estoque, preco, descricao);

  if (produtoNaoValidado) {
    return res.status(400).json(produtoNaoValidado);
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
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
  const { id } = req.params;
  const { usuario } = req;

  try {
    const queryProdutoExistente =
      "select * from produtos where id = $1 and usuario_id = $2";
    const produto = await conexao.query(queryProdutoExistente, [
      id,
      usuario.id,
    ]);

    if (produto.rowCount === 0) {
      return res.status(404).json("Produto não encontrado.");
    }

    const produtoNaoAtualizado =  await atualizarProdutoUsuario(
      nome,
      estoque,
      categoria,
      preco,
      descricao,
      imagem,
      id,
      usuario.id
    );

    if (produtoNaoAtualizado) {
      return res.status(400).json(produtoNaoAtualizado);
    }

    res.status(200).json("Produto atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarProduto = async (req,res) => {
  const { id } = req.params;
  const { usuario } = req;

  try{
    const query = 'select * from produtos where id = $1 and usuario_id = $2';
    const produto = await conexao.query(query, [id, usuario.id]);

    if(produto.rowCount === 0) {
      return res.status(404).json('Produto não encontrado.');
    }

    const queryDeletar = 'delete from produtos where id = $1 and usuario_id = $2';
    const produtoDeletado = await conexao.query(queryDeletar, [id, usuario.id]);

    if(produtoDeletado.rowCount === 0) {
      return res.status(400).json('Não foi possível excluir o produto.');
    }

    res.status(200).json('Produto deletado com sucesso.');
  }catch(error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
};
