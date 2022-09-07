import ListenType from "../types/listen.d";

const listen = (values: ListenType) => {
  const { channel, callback } = values;

  channel.assertQueue((process.env.microservice_origin = __dirname), {
    durable: false,
  });
  channel.prefetch(1);

  channel.consume(
    (process.env.microservice_origin = __dirname),
    async (msg) => {
      if (msg !== null) {
        const data = msg.content.toString();
        await callback(data);
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(data), {
          correlationId: msg.properties.correlationId,
        });

        channel.ack(msg);
      }
    },
    { noAck: false }
  );
};
export default listen;
