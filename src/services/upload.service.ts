import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

class UploadService {
  constructor() {}

  async createPresignedUrl(username: string) {
    const key = this.generateKeyFromUser({ username })
    const client = new S3Client({})
    const command = new PutObjectCommand({
      Bucket: process.env.IMAGE_BUCKET_ORIGINAL,
      Key: key,
    })

    const presignedUrl = await getSignedUrl(client, command, {
      expiresIn: Number(process.env.UPLOAD_EXPIRES_IN) || 3600,
    })

    return { presignedUrl, key }
  }

  generateKeyFromUser(user: { username: string }) {
    return `${user.username}/${Date.now()}.jpg`
  }
}

export default UploadService
