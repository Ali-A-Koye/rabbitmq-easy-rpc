const express = require("express");
const app = express();
const port = 3000;
const amqplib = require("amqplib");

const rabbitmqEasyRpc = require("rabbitmq-easy-rpc").default;

let connection;
let channel;

app.get("/send", async (req, res) => {
  let response = await rabbitmqEasyRpc.request({
    to: "microservice_B",
    data: JSON.stringify({
      dummy: "data1",
    }),
    channel,
  });

  res.send(response);
});

app.listen(port, async () => {
  connection = await amqplib.connect("amqp://localhost");
  channel = await connection.createChannel();
  rabbitmqEasyRpc.listen({
    channel,
    callback: async (data) => {
      //any logic you want to do before sending back to the client
      console.log(data);
    },
    source: "microservice_A",
  });

  console.log(`Example app listening on port ${port}`);
});
