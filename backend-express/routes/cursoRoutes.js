const express = require('express');
const routes = express.Router();

const {
    crear,
    listar,
    actualizar,
    eliminar
} = require('../controllers/cursoController');

const {
    verificarToken,
    soloAdmin
} = require('../middlewares/authMiddleware');

routes.post('/cursos', verificarToken, soloAdmin, crear);

routes.get('/cursos', listar);

routes.put('/cursos/:id', verificarToken, soloAdmin, actualizar);

routes.delete('/cursos/:id', verificarToken, soloAdmin, eliminar);

module.exports = routes;