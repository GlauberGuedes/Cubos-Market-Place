const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaSecreta = require("../senhaSecreta");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json("Email e senha devem ser informados.");
  }

  try {
    const queryVerificarEmail = "select * from usuarios where email = $1";
    const { rowCount, rows } = await conexao.query(queryVerificarEmail, [
      email,
    ]);

    if (rowCount === 0) {
      return res.status(404).json("Usuário não encontrado.");
    }

    const usuario = rows[0];
    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json("Email e senha não confere.");
    }

    const token = jwt.sign({ id: usuario.id }, senhaSecreta);
    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    res.status(200).json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { loginUsuario };
