import { FastifyInstance } from 'fastify'
import commentController from './comment/comment.controller'
import { errorHandler, replySerializer } from './middlewares/response'
import postController from './post/post.controller'
import userController from './user/userController'

import CommentService from '@services/comment.service'
import PostService from '@services/post.service'
import UploadService from '@services/upload.service'
import UserService from '@services/user.service'
import { MessageService } from '@services/message.service'
import { PostRepository } from '@repositories/post.repository'

async function routes(fastify: FastifyInstance, options: {}) {
  // DI manually
  const postRepository = new PostRepository()
  const messageService = new MessageService()
  const userService = new UserService()
  const postService = new PostService(
    postRepository,
    userService,
    messageService
  )
  const commentService = new CommentService(
    userService,
    postService,
    messageService
  )
  const uploadService = new UploadService()

  fastify.decorate('postService', postService)
  fastify.decorate('uploadService', uploadService)
  fastify.decorate('commentService', commentService)
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.SECRET_KEY,
  })
  fastify.register(postController, { prefix: '/post' })
  fastify.register(commentController, { prefix: '/comment' })
  fastify.register(userController, { prefix: '/user' })
  fastify.setReplySerializer(replySerializer)
  fastify.setErrorHandler(errorHandler)
}

export default routes
