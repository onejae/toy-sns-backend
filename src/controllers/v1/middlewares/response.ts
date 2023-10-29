import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const replySerializer = (payload: any, statusCode: any) => {
  return JSON.stringify({
    data: payload,
    result: statusCode === 200 ? true : false,
  })
}

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.status(409).send({ error_msg: error.message || error })
}
