import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";
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

const objObtenerMensaje = async (queueUrl = SQS_QUEUE_URL) => {
  const command = new ReceiveMessageCommand({
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ["All"],
    QueueUrl: queueUrl,
    WaitTimeSeconds: 20,
  });

  const response = await client.send(command);
  return response;
};

const objMensaje = await objObtenerMensaje();
const { Messages } = objMensaje;
console.log(Messages?.length || 0);

if (Messages?.length == 1) {
  console.log(Messages[0].MessageAttributes);
  const objEliminarMensaje = new DeleteMessageCommand({
    QueueUrl: SQS_QUEUE_URL,
    ReceiptHandle: Messages[0].ReceiptHandle,
  });
  const objRespuestaEliminacionMensaje = await client.send(objEliminarMensaje);
  console.log(objRespuestaEliminacionMensaje);
}
