import { MESSAGE_TYPE } from '../../src/services/message.service'
import PostService from '../../src/services/post.service'

const mockPostRepository = {
  findPosts: jest.fn(),
  findPostsWithComments: jest.fn(),
}

const mockUserService = {}

const mockMessageService = {
  appendMessage: jest.fn(),
}

const postService = new PostService(
  mockPostRepository as any,
  mockUserService as any,
  mockMessageService as any
)

describe('PostService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new post and append it to a message queue', async () => {
    const userName = 'testuser'
    const newPost = { text: 'Test post', image_url: 'test.jpg' }

    await postService.createPost(userName, newPost)

    expect(mockMessageService.appendMessage).toHaveBeenCalledWith(
      MESSAGE_TYPE.NEW_POST,
      { user_name: userName },
      newPost
    )
  })
})
