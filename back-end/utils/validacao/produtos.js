function validarProduto(nome, estoque, preco, descricao) {
    if (!nome.trim()) return "O campo nome é obrigatório.";
  
    if (!estoque) return "O campo estoque é obrigatório.";
  
    if (!preco) return "O campo preco é obrigatório.";
  
    if (!descricao.trim()) return "O campo descricao é obrigatório.";
  }

  module.exports = { validarProduto };