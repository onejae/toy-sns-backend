import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

export const MESSAGE_TYPE = {
  NEW_POST: 'NEW_POST',
  DELETE_POST: 'DELETE_POST',
  NEW_COMMENT: 'NEW_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
}

export class MessageService {
  sqsClient: SQSClient
  constructor() {
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
    })
  }

  appendMessage = async (type: any, user: any, data: any) => {
    const body = {
      messageType: type,
      user: user,
      data: data,
      timestamp: new Date().getTime(),
    }

    const command = new SendMessageCommand({
      QueueUrl: process.env.AWS_QUEUE_URL,
      MessageBody: JSON.stringify(body),
      MessageGroupId: 'POST-MESSAGE-GROUP',
    })

    await this.sqsClient.send(command)
  }
}
