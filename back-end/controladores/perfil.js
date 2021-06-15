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

    let senhaCriptografada = null;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    const queryAtualizarUsuario =
      "update usuarios set nome = coalesce($1, nome), nome_loja = coalesce($2, nome_loja), email = coalesce($3, email), senha = coalesce($4, senha) where id = $5";
    const usuarioAtualizado = await conexao.query(queryAtualizarUsuario, [
      nome || null,
      nome_loja || null,
      email || null,
      senhaCriptografada,
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
