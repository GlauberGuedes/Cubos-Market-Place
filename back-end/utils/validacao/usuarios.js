function validarUsuario(nome, nome_loja, email, senha) {
  if (!nome.trim()) return "O campo nome é obrigatório.";

  if (!nome_loja.trim()) return "O campo nome da loja é obrigatório.";

  if (!email.trim()) return "O campo email é obrigatório.";

  if (!senha.trim()) return "O campo senha é obrigatório.";

  if (!email.includes("@")) return "O campo email está incorreto.";

  const indice = email.indexOf("@");
  if (!email.includes(".", indice)) return "O campo email está incorreto.";
}

function validarAtualizaçãoDoUsuario (nome, email, nome_loja, senha) {
  if(email) {
    if (!email.trim()) return "O campo email não pode ser espaços vazios.";

    if (!email.includes("@")) return "O campo email está incorreto.";

    const indice = email.indexOf("@");
    if (!email.includes(".", indice)) return "O campo email está incorreto.";
  }

  if(nome) {
    if (!nome.trim()) return "O campo nome não pode ser espaços vazios.";
  }

  if(nome_loja) {
    if (!nome_loja.trim()) return "O campo nome da loja não pode ser espaços vazios.";
  }

  if(senha) {
    if (!senha.trim()) return "O campo senha não pode ser espaços vazios.";
  }
}

module.exports = { validarUsuario, validarAtualizaçãoDoUsuario };
