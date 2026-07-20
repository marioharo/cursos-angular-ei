const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                mensaje: 'Token no proporcionado'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                mensaje: 'Token inválido'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
};

const soloAdmin = (req, res, next) => {

    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({
            mensaje: 'Acceso denegado: se requiere rol ADMIN'
        });
    }

    next();
};

module.exports = {
    verificarToken,
    soloAdmin
};