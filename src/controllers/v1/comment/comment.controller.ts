import { FastifyInstance } from 'fastify'
import { authCheck } from '../middlewares/auth'
import {
  DeleteComment,
  DeleteCommentType,
  NewComment,
  NewCommentType,
} from './comment.schema'
import { User } from '@services/user.schema'

async function routes(fastify: FastifyInstance, options: {}) {
  fastify.post(
    '/',
    { schema: { body: NewComment }, preValidation: [authCheck] },
    (request) => {
      fastify.commentService?.createComment(
        request.user as User,
        request.body as NewCommentType
      )

      return {}
    }
  )

  fastify.delete(
    '/',
    { schema: { body: DeleteComment }, preValidation: [authCheck] },
    async (request) => {
      await fastify.commentService?.deleteComment(
        request.user as User,
        request.body as DeleteCommentType
      )

      return {}
    }
  )
}

export default routes
