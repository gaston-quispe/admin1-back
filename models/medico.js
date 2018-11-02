'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicoSchema  = Schema({
    nombre: String,
    telefono: String,
    email: String,
    especialidad: String,
})

module.exports = mongoose.model('Medico', MedicoSchema)