const conexao = require("../../conexao");
const bcrypt = require("bcrypt");

const atualizarPerfilUsuario = async (
  email,
  nome,
  nome_loja,
  senha,
  idUsuario
) => {
  try {
    if (email) {
      const query = "update usuarios set email = $1 where id = $2";
      const usuarioAtualizado = await conexao.query(query, [email, idUsuario]);

      if (usuarioAtualizado.rowCount === 0) {
        return "Email não foi atualizado.";
      }
    }
    if (nome) {
      const query = "update usuarios set nome = $1 where id = $2";
      const usuarioAtualizado = await conexao.query(query, [nome, idUsuario]);

      if (usuarioAtualizado.rowCount === 0) {
        return "Nome não foi atualizado.";
      }
    }
    if (nome_loja) {
      const query = "update usuarios set nome_loja = $1 where id = $2";
      const usuarioAtualizado = await conexao.query(query, [
        nome_loja,
        idUsuario,
      ]);

      if (usuarioAtualizado.rowCount === 0) {
        return "Nome da loja não foi atualizado.";
      }
    }
    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      const query = "update usuarios set senha = $1 where id = $2";
      const usuarioAtualizado = await conexao.query(query, [
        senhaCriptografada,
        idUsuario,
      ]);

      if (usuarioAtualizado.rowCount === 0) {
        return "Senha não foi atualizado.";
      }
    }
  } catch (error) {
    return `${error.message}`;
  }
};

module.exports = atualizarPerfilUsuario;
