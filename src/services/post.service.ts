import UserService from './user.service'
import { MESSAGE_TYPE, MessageService } from './message.service'
import { PostRepository } from 'src/repositories/post.repository'

class PostService {
  postRepository: PostRepository
  userService: UserService
  messageService: MessageService

  constructor(
    postRepository: PostRepository,
    userService: UserService,
    messageService: MessageService
  ) {
    this.postRepository = postRepository
    this.userService = userService
    this.messageService = messageService
  }

  async createPost(
    userName: string,
    newPost: { text: string; image_url: string }
  ) {
    const post = {
      user: { user_name: userName },
      data: { ...newPost },
    }

    await this.messageService.appendMessage(
      MESSAGE_TYPE.NEW_POST,
      post.user,
      post.data
    )

    return post
  }

  async findPosts(cursor: number, size: number) {
    return await this.postRepository.findPosts(cursor, size)
  }

  async findPostsWithComments(cursor: number, size: number) {
    const sourceData = await this.postRepository.findPostsWithComments(
      cursor,
      size
    )

    interface AggregatedPost {
      id: number
      text: string
      updated_at: string
      comments: string[] | null
    }

    const postsMap = new Map<number, AggregatedPost>()

    if (Array.isArray(sourceData)) {
      sourceData.forEach((post: any) => {
        if (!postsMap.has(post.id)) {
          postsMap.set(post.id, {
            id: post.id,
            text: post.text,
            updated_at: post.updated_at,
            comments: [],
          })
        }

        const currentPost = postsMap.get(post.id)

        if (currentPost && post.comment_text) {
          currentPost.comments?.push(post.comment_text)
        }
      })
    }

    const aggregatedPosts = Array.from(postsMap.values())

    return aggregatedPosts
  }
}

export default PostService
