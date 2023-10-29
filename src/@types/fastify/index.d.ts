import CommentService from '@services/comment.service'
import PostService from '@services/post.service'
import UploadService from '@services/upload.service'
import 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    postService?: PostService
    uploadService?: UploadService
    commentService?: CommentService
  }

  interface FastifyRequest {
    user: any
  }
}
