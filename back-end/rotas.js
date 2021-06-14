const express = require('express');
const rotas = express();
const cadastro = require('./controladores/cadastro');
const login = require('./controladores/login');
const perfil = require('./controladores/perfil');
const produtos = require('./controladores/produtos');
const verificarToken = require('./filtros/verificarToken');

//cadastro
rotas.post('/cadastro', cadastro.CadastrarUsuario);

//login
rotas.post('/login', login.loginUsuario);

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