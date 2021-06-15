const conexao = require("../conexao");

function validarUsuario(nome, nome_loja, email, senha) {
  if (!nome.trim()) return "O campo nome é obrigatório.";

  if (!nome_loja.trim()) return "O campo nome da loja é obrigatório.";

  if (!email.trim()) return "O campo email é obrigatório.";

  if (!senha.trim()) return "O campo senha é obrigatório.";

  if (!email.includes("@")) return "O campo email está incorreto.";

  const indice = email.indexOf("@");
  if (!email.includes(".", indice)) return "O campo email está incorreto.";
}

async function validarAtualizaçãoDoUsuario(
  nome,
  email,
  nome_loja,
  senha,
  emailUsuario
) {
  if (email) {
    if (!email.trim()) return "O campo email não pode ser espaços vazios.";

    if (!email.includes("@")) return "O campo email está incorreto.";

    const indice = email.indexOf("@");
    if (!email.includes(".", indice)) return "O campo email está incorreto.";

    try {
      if (email && email !== emailUsuario) {
        const queryVerificarEmail = "select * from usuarios where email = $1";
        const { rowCount: quantidadeUsuario } = await conexao.query(
          queryVerificarEmail,
          [email]
        );

        if (quantidadeUsuario > 0) {
          return "Email já cadastrado.";
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  if (nome) {
    if (!nome.trim()) return "O campo nome não pode ser espaços vazios.";
  }

  if (nome_loja) {
    if (!nome_loja.trim())
      return "O campo nome da loja não pode ser espaços vazios.";
  }

  if (senha) {
    if (!senha.trim()) return "O campo senha não pode ser espaços vazios.";
  }
}

module.exports = { validarUsuario, validarAtualizaçãoDoUsuario };
