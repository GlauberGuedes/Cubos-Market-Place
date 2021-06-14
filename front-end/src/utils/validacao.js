export function validarCadastro({
  senha,
  senhaRepetida,
  nome,
  nome_loja,
  email,
}) {
  if (senha !== senhaRepetida) {
    return 'As senhas devem ser iguais.';
  }
  if (!nome) {
    return 'O campo nome é obrigatório.'
  }
  if (!senha) {
    return 'O campo senha é obrigatório.'
  }
  if (!nome_loja) {
    return 'O campo nome da loja é obrigatório.'
  }
  if (!email) {
    return 'O campo email é obrigatório.'
  }
}

export function validarLogin ({email, senha}) {
  if (!senha) {
    return 'O campo senha é obrigatório.'
  }
  if (!email) {
    return 'O campo email é obrigatório.'
  }
}

