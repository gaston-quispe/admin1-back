'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol,
    })

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })

        return res.status(201).send({ token: service.createToken(user)})
    })
}

function signIn(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => { //TODO: Corregido!
        if (err) return res.status(500).send({ message: `Error al buscar al usuario: ${err}` })
        if (!user) return res.status(404).send({ message: 'No existe el usuario'})

        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            user: user,
            token:service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}