const Medico = require('../models/medico')

function getMedico(req) {
    let medicoId = req.params.medicoId

    Medico.findById(medicoId, (err, medico) => {
        if (err) return res.status(500).send( {message: `Error al realizar la petición: ${err}`})
        if (!medico) return res.status(404).send( {message: 'El medico no existe'})

        res.status(200).send({medico})
    })
}

function getMedicos(req, res) {
    Medico.find({}, (err, medicos) => {
        if (err) return res.status(500).send( {message: `Error al realizar la petición: ${err}`})
        if (!medicos) return res.status(404).send({ message: 'No existen medicos'})
    
        res.status(200).send({medicos})
    })
}

function saveMedico(req, res) {
    console.log('POST /api/medico')
    console.log(req.body)

    let medico = new Medico()
    medico.nombre = req.body.name
    medico.telefono = req.body.telefono
    medico.email = req.body.email
    medico.especialidad = req.body.especialidad

    medico.save((err, medicoStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}` })

        res.status(200).send({medico: medicoStored})
    })
}

function updateMedico(req, res) {
    let medicoId = req.params.medicoId
    let update = req.body

    Medico.findByIdAndUpdate(medicoId, update, (err, medicoUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar al medico: ${err}`})
        
        res.status(200).send({ product: medicoUpdated })
    })
}

function deleteMedico(req, res) {
    console.log('xxx')
    let medicoId = req.params.medicoId

    Medico.findById(medicoId, (err, medico) => {
        if (err) res.status(500).send({message: `Error al borrar al medico: ${err}`})
        
        medico.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar al medico: ${err}` })
            res.status(200).send({ message: 'El medico ha sido eliminado' })
        })
    })
}

module.exports = {
    getMedico,
    getMedicos,
    saveMedico,
    updateMedico,
    deleteMedico
}