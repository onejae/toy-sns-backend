import { FastifyInstance, FastifyRequest } from 'fastify'
import { authCheck } from '../middlewares/auth'
import { GetPosts, GetPostsType, NewPost, NewPostType } from './post.schema'

async function routes(fastify: FastifyInstance, options: {}) {
  fastify.post(
    '/',
    { schema: { body: NewPost }, preValidation: [authCheck] },
    (request) => {
      fastify.postService?.createPost(
        request.user.username,
        request.body as NewPostType
      )

      return {}
    }
  )

  fastify.post(
    '/presigned_url',
    { preHandler: [authCheck] },
    async (request: FastifyRequest) => {
      const { presignedUrl, key } =
        await fastify.uploadService!.createPresignedUrl(request.user.username)

      return {
        presignedUrl,
        expires_in: process.env.UPLOAD_EXPIRES_IN,
        key,
      }
    }
  )

  fastify.get('/', { schema: { querystring: GetPosts } }, async (request) => {
    const query = request.query as GetPostsType
    const posts = await fastify.postService?.findPostsWithComments(
      Number(query.after),
      Number(query.page_size)
    )

    return { posts }
  })
}

export default routes
