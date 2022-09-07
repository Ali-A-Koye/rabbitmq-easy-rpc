  
import { Channel } from "amqplib";
type Request = {
    to: string;
    channel: Channel;
    data: string;
  };

export default Request;