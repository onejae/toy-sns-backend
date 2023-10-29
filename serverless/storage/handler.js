const sharp = require('sharp')
const AWS = require('aws-sdk')

module.exports.resizeImage = async (event) => {
  try {
    console.log('---- Envs: ', process.env)
    const s3 = new AWS.S3({
      region: process.env.AWS_S3_REGION,
    })

    const key = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, ' ')
    )
    console.log('--- start converting: ', key)
    const objectInfo = {
      Bucket: process.env.SOURCE_BUCKET,
      Key: key,
    }
    var origimage = await s3.getObject(objectInfo).promise()

    const resizedImageBuffer = await sharp(origimage.Body)
      .jpeg()
      .resize({ width: 600, height: 600 })
      .toBuffer()

    const destparams = {
      Bucket: process.env.DEST_BUCKET,
      Key: key,
      Body: resizedImageBuffer,
      ContentType: 'image/jpeg',
    }

    await s3.putObject(destparams).promise()

    console.log('-- Resized successfully: ', key)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Image resized successfully' }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Image resizing failed' }),
    }
  }
}
