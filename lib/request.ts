import { v4 as uuidv4 } from "uuid";
import RequestType from "../types/request";

const request = async (values: RequestType) => {
  const { to, data, channel } = values;

  return new Promise(async (resolve, reject) => {
    const uuid = uuidv4();

    const q = await channel.assertQueue("", {
      durable: false,
      autoDelete: true,
      arguments:{
        "x-single-active-consumer": true,
      }
    });

    channel.sendToQueue(to, Buffer.from(data), {
      replyTo: q.queue,
      correlationId: uuid,
      // @ts-ignore: consumerTag is not defined in the types but will be passed as fields
      consumerTag: uuid,
    });

    channel.consume(
      q.queue,
      (msg) => {
        if (msg !== null) {
          if (msg.properties.correlationId == uuid) {
            channel.cancel(msg.fields.consumerTag);
            return resolve(msg.content.toString());
          }
        }
      },
      { noAck: true }
    );

    return setTimeout(() => {
      return resolve("Timeout, could not get response from " + to);
    }, 5000);
  });
};

export default request;
