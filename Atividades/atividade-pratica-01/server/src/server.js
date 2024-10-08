import express from 'express'
// Import Routes
import { estadoRouter } from './routes/estados.js'
import { cidadeRouter } from './routes/cidades.js'
import { tipoRouter } from './routes/tipo.js'
import { pessoaRouter } from './routes/pessoas.js'
import { localRouter } from './routes/locais.js'
import { doacaoRouter } from './routes/doacoes.js'

import cors from 'cors'

const server = express()
const PORT = 5000

// Routes
server.get('/', (request, response) => {
    response.json({
        message : 'Status: Server is running.'
    })
})

server.use(cors())
server.use(express.json())
server.use(estadoRouter)
server.use(cidadeRouter)
server.use(tipoRouter)
server.use(pessoaRouter)
server.use(localRouter)
server.use(doacaoRouter)

// Start - listen

server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}.`)
})