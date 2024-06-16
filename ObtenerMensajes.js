import { ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";
dotenv.config();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const QueueUrl = process.env.AWS_SQL_URL_COLA;
const client = new SQSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
// const client = new SQSClient({});
const SQS_QUEUE_URL = QueueUrl;

export const main = async (queueUrl = SQS_QUEUE_URL) => {
  const command = new ReceiveMessageCommand({
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ["All"],
    QueueUrl: queueUrl,
    // The duration (in seconds) for which the call waits for a message
    // to arrive in the queue before returning. If a message is available,
    // the call returns sooner than WaitTimeSeconds. If no messages are
    // available and the wait time expires, the call returns successfully
    // with an empty list of messages.
    // https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html#API_ReceiveMessage_RequestSyntax
    WaitTimeSeconds: 20,
  });

  const response = await client.send(command);
  return response;
};

const objRespuesta = await main();
console.log(objRespuesta);
console.log(objRespuesta.Messages[0].MessageAttributes);
