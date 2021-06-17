function validarProduto(nome, estoque, preco, descricao) {
  if (!nome.trim()) return "O campo nome é obrigatório.";

  if (!estoque) return "O campo estoque é obrigatório.";

  if (!Number(estoque)) return "O campo estoque deve ser um número.";

  if (!preco) return "O campo preco é obrigatório.";

  if (!Number(preco)) return "O campo preco deve ser um número.";

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
