import { Static, Type } from '@sinclair/typebox'

export const NewPost = Type.Object({
  text: Type.String(),
  image_url: Type.String(),
})

export type NewPostType = Static<typeof NewPost>

export const GetPosts = Type.Object({
  after: Type.String(),
  page_size: Type.String(),
})

export type GetPostsType = Static<typeof GetPosts>
