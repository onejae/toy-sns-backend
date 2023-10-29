import mysql from 'mysql2/promise'
import { options } from '@configs/mysql'

export class PostRepository {
  pool: mysql.Pool
  constructor() {
    this.pool = mysql.createPool(options)
  }

  async findPosts(after: number, page_size: number) {
    const connection = await this.pool.getConnection()
    const command = connection.execute(
      `
        SELECT P.id, P.text, P.updated_at, COUNT(C.id) AS comment_count
        FROM (
            SELECT id, text, updated_at
            FROM post
            WHERE id > ${after}
            LIMIT ${page_size}
        ) P
        LEFT OUTER JOIN comment C ON P.id = C.postId
        GROUP BY P.id
        ORDER BY comment_count DESC;`
    )

    const [result] = await command

    return result
  }

  async findPostsWithComments(after: number, page_size: number) {
    const connection = await this.pool.getConnection()
    const command = connection.execute(
      `
        SELECT P.id, P.text, P.updated_at, C.text AS comment_text
        FROM (
            SELECT id, text, updated_at
            FROM post
            WHERE id > ${after}
            LIMIT ${page_size}
        ) P
        LEFT OUTER JOIN comment C ON P.id = C.postId;
     `
    )

    const [result] = await command

    return result
  }
}
