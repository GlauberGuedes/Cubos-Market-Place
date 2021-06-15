function validarProduto(nome, estoque, preco, descricao) {
  if (!nome.trim()) return "O campo nome é obrigatório.";

  if (!estoque) return "O campo estoque é obrigatório.";

  if (!preco) return "O campo preco é obrigatório.";

  if (!descricao.trim()) return "O campo descricao é obrigatório.";
}

function validarProdutoDaAtualizacao(nome, descricao, imagem) {
  if (nome) {
    if (!nome.trim()) return "O campo nome não pode ser espaços vazios.";
  }
  if (descricao) {
    if (!nome.trim()) return "O campo descricao não pode ser espaços vazios.";
  }
  if (imagem) {
    if (!nome.trim()) return "O campo imagem não pode ser espaços vazios.";
  }
}

module.exports = { validarProduto, validarProdutoDaAtualizacao };
