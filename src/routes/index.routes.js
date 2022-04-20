const express = require('express');
const routes = express.Router();
const auth = require('../config/auth/auth');
const multer = require('multer')
const upload = require('../utils/multer');
const path = require('path');

const UsuariosController = require('../controller/usuarios.controller');
const usuariosController = new UsuariosController();

const AlunosController = require('../controller/alunos.controller');
const alunosController = new AlunosController();

const ColetasController = require('../controller/coletas.controller');
const coletasController = new ColetasController();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../', 'uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + ".xlsx");
    },
});
const multerUpload = multer({ storage: fileStorage });

/** Endpoints de operações com usuários */
routes.post('/login', usuariosController.login());
routes.post('/register', usuariosController.register());
routes.post('/recover', usuariosController.recover());

/** Endpoints de operações com alunos */
routes.get('/alunos', /* auth.isAuthenticated, */ alunosController.list());
routes.get('/alunos/:id', /* auth.isAuthenticated, */ alunosController.list());
routes.post('/record', /* auth.isAuthenticated, */ alunosController.record());
routes.delete('/alunos/:id', /* auth.isAuthenticated, */ alunosController.delete());
routes.patch('/record/:rm', /* auth.isAuthenticated, */ alunosController.update());
routes.post('/alunosxlx', multerUpload.single("file"), coletasController.LerXLSXs());

/** Endpoints de operações com coletas */
routes.get('/coletas', coletasController.list());
routes.get('/coletas/:id', coletasController.list());

module.exports = routes;