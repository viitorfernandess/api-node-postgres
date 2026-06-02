import express from 'express'
const app = express()
const port = 3000

import pool from './database.js'

app.get( '/', ( req, res) => {
    res.send('API funcionando !')
})

app.listen(port, () => {
    console.log( `Servidor rodando na porta ${port}`)
})