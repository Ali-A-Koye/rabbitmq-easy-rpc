  
import { Channel } from "amqplib";
type Listen = {
    channel: Channel;
    callback: (data: string) => Promise<void>;
  };

export default Listen;