const express = require('express');
const routes = express.Router();

const UsuariosController = require('../controller/usuarios.controller');
const usuariosController = new UsuariosController();

routes.post('/login', usuariosController.login());
routes.post('/register', usuariosController.register());

module.exports = routes;