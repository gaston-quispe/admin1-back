'use strict'

const express = require('express')
const medicoCtrl = require('../controllers/medico')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

const api = express.Router()

/*MEDICO*/
api.get('/medico', medicoCtrl.getMedicos)
api.get('/medico/:medicoId', medicoCtrl.getMedico)
api.post('/medico', medicoCtrl.saveMedico)
api.put('/medico/:medicoId', medicoCtrl.updateMedico)
api.delete('/medico/:medicoId', medicoCtrl.deleteMedico)

/*USERS*/
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})
api.get('/getUser', auth, (req, res) => {
    res.status(200).send({ user: 'pepe', rol: 'medico'})
})

module.exports = api