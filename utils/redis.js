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
      const setKey = promisify(this.client.set).bind(this.client);
      return setKey(key, value, "EX", duration);
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
