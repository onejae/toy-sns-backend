import { FastifyInstance, FastifyRequest } from 'fastify'
import { SignIn } from './user.schema'

async function routes(fastify: FastifyInstance, options: {}) {
  fastify.post(
    '/signin',
    { schema: { body: SignIn } },
    (request: FastifyRequest, reply: any) => {
      reply.jwtSign(request.body, function (err: any, token: any) {
        return reply.send(err || { token: token })
      })
    }
  )
}

export default routes
