import { MESSAGE_TYPE, MessageService } from './message.service'
import PostService from './post.service'
import UserService from './user.service'
import { User } from './user.schema'

class CommentService {
  userService: UserService
  postService: PostService
  messageService: MessageService

  constructor(
    userService: UserService,
    postService: PostService,
    messageService: MessageService
  ) {
    this.userService = userService
    this.postService = postService
    this.messageService = messageService
  }

  async createComment(
    user: User,
    newComment: { text: string; post_id: string }
  ) {
    const comment = {
      user: { ...user },
      data: { ...newComment },
    }
    await this.messageService.appendMessage(
      MESSAGE_TYPE.NEW_COMMENT,
      comment.user,
      comment.data
    )

    return comment
  }

  async deleteComment(user: User, targetComment: { comment_id: number }) {
    if (user) {
      const comment = {
        user: { ...user },
        data: { ...targetComment },
      }

      await this.messageService.appendMessage(
        MESSAGE_TYPE.DELETE_COMMENT,
        comment.user,
        comment.data
      )

      return comment
    }
  }
}

export default CommentService
