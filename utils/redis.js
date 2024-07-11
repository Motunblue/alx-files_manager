const redis = require('redis');


class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = true;

    this.client.on('error', (err) => {
      console.error('Redis client error', err);
      this.connected = false;
    });

    this.client.on('connect', () => {
      this.connected = true;
    });
  }

  isAlive() {
    return this.connected
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          return reject(err);
        }
        resolve(reply);
      });
    });
  }

  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, reply) => {
        if (err) {
          return reject(err);
        }
        resolve(reply);
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          return reject(err);
        }
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
