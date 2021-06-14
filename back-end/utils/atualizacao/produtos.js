const conexao = require("../../conexao");

const atualizarProdutoUsuario = async (
  nome,
  estoque,
  categoria,
  preco,
  descricao,
  imagem,
  id,
  idUsuario
) => {
  try {
    if (nome) {
      const query =
        "update produtos set nome = $1 where id = $2 and usuario_id = $3";
      const produtoAtualizado = await conexao.query(query, [
        nome,
        id,
        idUsuario,
      ]);

      if (produtoAtualizado.rowCount === 0) {
        return "Não foi possível atualizar o nome.";
      }
    }
    if (estoque) {
      const query =
        "update produtos set estoque = $1 where id = $2 and usuario_id = $3";
      const produtoAtualizado = await conexao.query(query, [
        estoque,
        id,
        idUsuario,
      ]);

      if (produtoAtualizado.rowCount === 0) {
        return "Não foi possível atualizar o estoque.";
      }
    }
    if (categoria) {
      const query =
        "update produtos set categoria = $1 where id = $2 and usuario_id = $3";
      const produtoAtualizado = await conexao.query(query, [
        categoria,
        id,
        idUsuario,
      ]);

      if (produtoAtualizado.rowCount === 0) {
        return "Não foi possível atualizar a categoria.";
      }
    }
    if (preco) {
      const query =
        "update produtos set preco = $1 where id = $2 and usuario_id = $3";
      const produtoAtualizado = await conexao.query(query, [
        preco,
        id,
        idUsuario,
      ]);

      if (produtoAtualizado.rowCount === 0) {
        return "Não foi possível atualizar o preco.";
      }
    }
    if (descricao) {
      const query =
        "update produtos set descricao = $1 where id = $2 and usuario_id = $3";
      const produtoAtualizado = await conexao.query(query, [
        descricao,
        id,
        idUsuario,
      ]);

      if (produtoAtualizado.rowCount === 0) {
        return "Não foi possível atualizar a descricao.";
      }
    }
    if (imagem) {
      const query =
        "update produtos set imagem = $1 where id = $2 and usuario_id = $3";
      const produtoAtualizado = await conexao.query(query, [
        imagem,
        id,
        idUsuario,
      ]);

      if (produtoAtualizado.rowCount === 0) {
        return "Não foi possível atualizar a imagem.";
      }
    }
  } catch (error) {
    return `${error.message}`;
  }
};

module.exports = atualizarProdutoUsuario;
