const MESSAGE_TYPE = {
  NEW_POST: 'NEW_POST',
  DELETE_POST: 'DELETE_POST',
  NEW_COMMENT: 'NEW_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
}

const mysql = require('mysql2/promise')
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 20,
  waitForConnection: false,
})

module.exports.handler = async (event) => {
  const connection = await pool.getConnection()

  for (const record of event.Records) {
    const { messageType, user, data } = JSON.parse(record.body)

    let command = undefined

    switch (messageType) {
      case MESSAGE_TYPE.NEW_POST:
        command = connection.execute(
          'INSERT INTO post (text, image_url) VALUES (?, ?)',
          [data.text, data.image_url]
        )
        break
      case MESSAGE_TYPE.NEW_COMMENT:
        command = connection.execute(
          'INSERT INTO comment (text, postId, userId) VALUES (?, ?, ?)',
          [data.text, data.post_id, user.id]
        )
        break
      case MESSAGE_TYPE.DELETE_COMMENT:
        command = connection.execute(
          `DELETE FROM comment where id=${data.comment_id} and userId=${user.id}`
        )
        break
    }

    try {
      if (command) {
        console.log(command)
        const [result] = await command
      }
    } catch (e) {
      console.log('## Failed to append comment', data)
      console.log('## Error message ', e)
    } finally {
      console.log('released')
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Data deleted successfully' }),
  }
}
