const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const { validarAtualizaçãoDoUsuario } = require("../validacao/usuarios");

const dadosPerfil = (req, res) => {
  const { usuario } = req;
  res.status(200).json(usuario);
};

const atualizarPerfil = async (req, res) => {
  const { nome, nome_loja, senha, email } = req.body;
  const { usuario } = req;

  try {
    const ErroNaValidacaoDaAtualizacaoDoUsuario =
      await validarAtualizaçãoDoUsuario(
        nome,
        email,
        nome_loja,
        senha,
        usuario.email
      );

    if (ErroNaValidacaoDaAtualizacaoDoUsuario) {
      return res.status(400).json(ErroNaValidacaoDaAtualizacaoDoUsuario);
    }

    const queryPerfilUsuario = "select * from usuarios where id = $1";
    const { rows, rowCount } = await conexao.query(queryPerfilUsuario, [
      usuario.id,
    ]);

    if (rowCount === 0) {
      return res.status(404).json("Usuario não encontrado.");
    }

    const perfilUsuario = rows[0];
    let senhaCriptografada = null;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    const nomeAtualizado = nome || perfilUsuario.nome;
    const nomeDaLojaAtualizado = nome_loja || perfilUsuario.nome_loja;
    const emailAtualizado = email || perfilUsuario.email;
    const senhaAtualizada = senhaCriptografada || perfilUsuario.senha;

    const queryAtualizarUsuario =
      "update usuarios set nome = $1, nome_loja = $2, email = $3, senha = $4 where id = $5";
    const usuarioAtualizado = await conexao.query(queryAtualizarUsuario, [
      nomeAtualizado,
      nomeDaLojaAtualizado,
      emailAtualizado,
      senhaAtualizada,
      usuario.id,
    ]);

    if (usuarioAtualizado.rowCount === 0) {
      return res.status(400).json("Não foi possível atualizar o usuário.");
    }

    res.status(200).json("Usuario atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { dadosPerfil, atualizarPerfil };
