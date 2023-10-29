import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
dotenv.config()

export const options: mysql.PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 20,
}
