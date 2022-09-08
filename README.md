## RabbitMQ Easy RPC (Remote Procedure Call )

#### _The Node.js's RabbitMQ Easy RPC Library_

![download-image](https://www.nastel.com/wp-content/uploads/2022/05/rabbitmq.png)

[![Ali-A-Koye - rabbitmq-easy-rpc ](https://img.shields.io/static/v1?label=Ali-A-Koye&message=rabbitmq-easy-rpc&color=yellow&logo=github)](https://github.com/Ali-A-Koye/rabbitmq-easy-rpc) [![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/Ali-A-Koye/rabbitmq-easy-rpc/blob/master/LICENSE)

rabbitmq-easy-RPC is an easy to use npm package for rabbitMQ's RPC functionality. This package tries to make the developer's life easier by providing a wrapper around the rabbitMQ's RPC functionality so it is easier to use.

## RabbitMQ's RPC and what does this package try to solve?

In distributed computing, a remote procedure call is when a computer program causes a procedure to execute in a different address space, which is coded as if it were a normal procedure call, without the programmer explicitly coding the details for the remote interaction. RabbitMQ, as one of the message-broker software, supports this functionality of RPC call, you can read it from [the official documentation here](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html). However, this functionality has been achieved by using queues and the problem here is that it's harder to code a producer and a listener for the response.

With this package, it is done for you to just send your message and "await" it with asynchronous programming, and the queue management and listeners are handled by the package.

## Key Features

*   Easy to use.
*   it accepts RabbitMQ's as a parameter, thus you have the flexibility to do your RabbitMQ's channel reusability management.
*   Queue Management is handled by the package itself. It will create the necessary queues in the background without any interaction.
*   creates and destroys consumers for replies and requests.
*   Package built with Typescript, you will get the Typescript benefits of validation of your data if you already use Typescript.

## Table of Contents

*   [_**Demo**_](#demo)
*   [_**Requirements**_](#requirements)
*   [_**Usage**_](#usage)
    *   [_**Listening to incoming messages from others**_](#2---listening-to-incoming-messages-from-others)
    *   [_**requesting or sending data to other places and waiting for their response**_](#3---requesting-or-sending-data-to-other-places-and-wait-for-their-response)_**.**_
*   [_**API**_](#api)
*   [_**Author**_](#authors-&&-Contributors)
*   [_**License**_](#license)

## Demo

This is a simple [_**Demo**_](https://github.com/Ali-A-Koye/rabbitmq-easy-rpc/tree/master/demo) environment for the package where you can use and test the package , in the demo folder, there are 2 folders called A and B which represent Microservice A and Microservice B and the package is integrated with both of them so they can communicate with each other.

Work with the Demo instruction ( for each microservice )  :

```plaintext
npm install  // Installing dependencies
node server.js // To start the express.js server
```

## Requirements

In order to work with this package, you are required to have :

*   install node.js and npm
*   RabbitMQ server running locally or on the cloud

## Installation

To use the package you must first add it to your dependencies in your project.

```plaintext
$ npm i rabbitmq-easy-rpc
```

Then you have to register the package for your project.

### Typescript

```javascript
import rabbitmqEasyRpc from "rabbitmq-easy-rpc";
```

### Javascript

```javascript
const rabbitmqEasyRpc = require("rabbitmq-easy-rpc");
```

## Usage

The package consists of two functions that operate two major functions ( Listening and Requesting ). We will explain the necessary steps and tutorials for this package below.

With our aim for simplicity of this package, the integration part is the easiest and we will demonstrate it below.  

### 1 - Listening to incoming messages from others

You need this functionality only if you expect that you might get an RPC call from another place and your microservice has to respond. _In that case, you must call this function with the server starting so it will establish a queue and a consumer to be ready for incoming messages._  

*   The first parameter is the rabbitMQ's channel, which should be used to receive incoming messages. You can reuse your channels and pass any channel you want.
*   The callback is an asynchronous function that you pass. It will give you the incoming data and you can do any operations on it ( remember its passed by reference, so your changes are reflected ) and at the end, it just responds with the changed data.
*   The last one is the source name. It's your tag to communicate with other places and you will receive messages with this tag.

```javascript
rabbitmqEasyRpc.listen({
    channel,
    callback: async (data) => {
      //any logic you want to do before sending back to the requester
      console.log(data);
    },
    source: "origin_name",
  });
```

### 3 - requesting or sending data to other places and wait for their response.

You need this functionality to communicate with the other microservices. Maybe your microservice depends on another microservice, so it has to wait for the response to proceed.

*   to : the destination you want to hit with your message. Remember you have to put the source name's value of the destination , it has to be the same to hit
*   data : You have to pass a string in any case because any other type will throw an error because rabbitMQ only works with buffers.
*   channel: channel you want this call to use and perform communication.

```javascript
  let response = await rabbitmqEasyRpc.request({
    to: "other_microservice_label",
    data: JSON.stringify({  
      dummy: "data1",
    }),
    channel,
  });
```

## How Does it Work?

So, by focusing on the bigger image, this package helps you to send or receive messages from one place to another, preferably with a microservice architecture.   
This package uses temporary queues and consumers send a request and wait for the reply. The queues will get deleted as well as the consumers right after we get the response.  
Also, the packages use one permanent queue for listening per microservice.

So every microservice is labeled with a name. This name can be used to communicate with each other through listen and request functions. It's as simple as that.

## API

Below is a table of acceptable parameters for this library.

### Listen :

| Parameter | Description | Default | Validations |
| --- | --- | --- | --- |
| Channel | RabbitMQ's Channel |   | Required |
| Callback | Function that handles the data before sending it back to the requester |   | Required |
| source | label or tag for your section |   | required |

### Request

| Parameter | Description | Default | Validations |
| --- | --- | --- | --- |
| to | destination microservice |   | Required |
| data | stringify version of your data to be passed |   | Required |
| Channel | RabbitMQ's Channel |   | Required |

## Author

[Ali Amjed](https://github.com/Ali-A-Koye)

## License

[The MIT License](http://opensource.org/licenses/MIT)