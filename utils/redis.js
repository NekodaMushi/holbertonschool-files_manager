import { createClient } from "redis";
const { promisify } = require("util");

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on("error", (error) => {
      console.log(error.message);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      const getKey = promisify(this.client.get).bind(this.client);
      return getKey(key);
    } catch (err) {
      console.log("Redis get error: ", err);
    }
  }

  async set(key) {
    try {
      this.client.setex(key, duration, value);
    } catch (err) {
      console.log("Redis set error: ", err);
    }
  }

  async del(key) {
    try {
      this.client.del(key);
    } catch (err) {
      console.log("Redis del error: ", err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
