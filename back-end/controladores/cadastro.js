const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const { validarUsuario } = require("../validacao/usuarios");

const CadastrarUsuario = async (req, res) => {
  const { nome, nome_loja, email, senha } = req.body;

  try {
    const queryConsulta = "select * from usuarios where email = $1";
    const { rowCount: quantidadeUsuario } = await conexao.query(queryConsulta, [
      email,
    ]);

    if (quantidadeUsuario > 0) {
      return res.status(400).json("Email já cadastrado.");
    }

    const ErroNaValidacaoDoUsuario = validarUsuario(
      nome,
      nome_loja,
      email,
      senha
    );

    if (ErroNaValidacaoDoUsuario) {
      return res.status(400).json(ErroNaValidacaoDoUsuario);
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query =
      "insert into usuarios (nome, nome_loja, email, senha) values ($1, $2, $3, $4)";
    const usuario = await conexao.query(query, [
      nome,
      nome_loja,
      email,
      senhaCriptografada,
    ]);

    if (usuario.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o usuário.");
    }

    res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { CadastrarUsuario };
