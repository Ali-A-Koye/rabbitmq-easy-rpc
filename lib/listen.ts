import ListenType from "../types/listen.d";

const listen = (values: ListenType) => {
  const { channel, callback } = values;

  if(!process.env.microservice_origin) {
     console.log("No origin set for microservice in the environment variables")
     process.exit(1);
    }
  
  channel.assertQueue((process.env.microservice_origin), {
    durable: false,
  });
  channel.prefetch(1);

  channel.consume(
    (process.env.microservice_origin),
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
