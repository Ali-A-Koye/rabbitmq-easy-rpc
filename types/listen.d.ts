  
import { Channel } from "amqplib";
type Listen = {
    channel: Channel;
    source: string;
    callback: (data: string) => Promise<void>;
  };

export default Listen;