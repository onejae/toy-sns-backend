import { Static, Type } from '@sinclair/typebox'

export const NewComment = Type.Object({
  text: Type.String(),
  post_id: Type.String(),
})

export type NewCommentType = Static<typeof NewComment>

export const DeleteComment = Type.Object({
  comment_id: Type.Integer(),
})

export type DeleteCommentType = Static<typeof DeleteComment>
