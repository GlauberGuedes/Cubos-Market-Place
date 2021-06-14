const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const { validarAtualizaçãoDoUsuario } = require("../utils/validacao/usuarios");
const atualizarPerfilUsuario =  require('../utils/atualizacao/usuario');

const dadosPerfil = (req, res) => {
  const { usuario } = req;
  res.status(200).json(usuario);
};

const atualizarPerfil = async (req, res) => {
  const { nome, nome_loja, senha, email } = req.body;
  const { usuario } = req;

  try {
    if (email && email !== usuario.email) {
      const queryVerificarEmail = "select * from usuarios where email = $1";
      const { rowCount: quantidadeUsuario } = await conexao.query(
        queryVerificarEmail,
        [email]
      );

      if (quantidadeUsuario > 0) {
        return res.status(400).json("Email já cadastrado.");
      }
    }

    const atualizacaoNaoValidade = validarAtualizaçãoDoUsuario(
      nome,
      email,
      nome_loja,
      senha
    );

    if (atualizacaoNaoValidade) {
      return res.status(400).json(atualizacaoNaoValidade);
    }

    const perfilAtualizado = await atualizarPerfilUsuario(email, nome, nome_loja, senha, usuario.id);

    if(perfilAtualizado) {
      return res.status(400).json(perfilAtualizado);
    }

    res.status(200).json("Usuário atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { dadosPerfil, atualizarPerfil };
