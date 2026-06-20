const cursos = require("../models/cursos");

// GET
exports.listar = async(req,res) => {
    try {
        const listarCursos = await cursos.find();
        res.json(listarCursos);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

// POST
exports.crear = async(req, res) => {
    try {
        const crearCursos = await cursos.create(req.body);
        res.status(201).json(crearCursos);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// PUT
exports.actualizar = async(req, res)=>{
    try {
        const actualizarCurso = await cursos.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(actualizarCurso);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// DELETE
exports.eliminar = async(req, res)=>{
    try {
        await cursos.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Curso eliminado'});
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}