const express = require('express');
const routes = express.Router();

const {
    registrar,
    login
} = require('../controllers/authController');

routes.post('/register', registrar);
routes.post('/login', login);

module.exports = routes;