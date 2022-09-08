import ListenType from "../types/listen.d";

const listen = (values: ListenType) => {
  const { channel, callback , source} = values;
  
  channel.assertQueue((source), {
    durable: false,
  });
  channel.prefetch(1);

  channel.consume(
    (source),
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
