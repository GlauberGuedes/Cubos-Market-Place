const express = require('express');
const rotas = express();
const cadastro = require('./controladores/cadastro');
const login = require('./controladores/login');
const perfil = require('./controladores/perfil');
const produtos = require('./controladores/produtos');
const verificarToken = require('./filtros/verificarToken');
const usuario = require('./controladores/usuario');

//cadastro
rotas.post('/cadastro', cadastro.CadastrarUsuario);
rotas.post('/cadastro-usuario', cadastro.CadastrarCliente);

//login
rotas.post('/login', login.loginUsuario);
rotas.post('/login-usuario', login.loginCliente);

//usuario
rotas.get('/usuario', usuario.listarProdutos);

rotas.use(verificarToken);

//perfil
rotas.get('/perfil', perfil.dadosPerfil);
rotas.put('/perfil', perfil.atualizarPerfil);

//produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.deletarProduto);



module.exports = rotas;