import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"; // ES Modules import
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
const input = {
  // SendMessageRequest
  QueueUrl, // required
  MessageBody: "0006", // required
  MessageAttributes: {
    // MessageBodyAttributeMap
    QuienMandaElMensaje: {
      DataType: "String",
      StringValue: "Proceso 0006",
    },
    sNombreProceso: {
      DataType: "String",
      StringValue: "Nombre proceso 0006",
    },
    Fecha: {
      DataType: "String",
      StringValue: new Date(),
    },
  },
};
const command = new SendMessageCommand(input);
const response = await client.send(command);
console.log(response);
