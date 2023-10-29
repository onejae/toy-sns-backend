import 'module-alias/register'
import fastify, { FastifyInstance } from 'fastify'

import api_routes_v1 from '@controllers/v1'

import dotenv from 'dotenv'

dotenv.config()

const server: FastifyInstance = fastify()

server.register(api_routes_v1, { prefix: '/v1' })

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
