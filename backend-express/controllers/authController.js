const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const registrar = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: 'Nombre, email y contraseña son obligatorios'
            });
        }

        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: 'El usuario ya existe'
            });
        }

        const passwordEncriptado = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordEncriptado,
            rol: rol || 'ESTUDIANTE'
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);

        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: 'Email y contraseña son obligatorios'
            });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const passwordValido = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValido) {
            return res.status(401).json({
                mensaje: 'Credenciales incorrectas'
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión correcto',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = {
    registrar,
    login
};