const conexao = require("../conexao");

const listarProdutos = async (req, res) => {
  try {
    const query = 'select produtos.id, nome_loja, produtos.nome, estoque, preco, descricao, imagem from produtos left join usuarios on produtos.usuario_id = usuarios.id';
    const listaProdutos = await conexao.query(query);

    res.status(200).json(listaProdutos.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { listarProdutos };
