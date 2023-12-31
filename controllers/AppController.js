import dbClient from "../utils/db";
import redisClient from "../utils/redis";

class AppController {
  static getStatus(request, response) {
    response
      .status(200)
      .send({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(request, response) {
    response
      .status(200)
      .send({
        users: await dbClient.nbUsers(),
        files: await dbClient.nbFiles(),
      });
  }
}

export default AppController;
