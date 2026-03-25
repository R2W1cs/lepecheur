import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || "redis://default:qyAiYAyyrW7OVRK4mhhzJBnk9uo9IrS6@redis-12932.c17.us-east-1-4.ec2.cloud.redislabs.com:12932";

const redis = new Redis(REDIS_URL, {
  tls: {
    rejectUnauthorized: false
  },
  connectTimeout: 10000,
});

redis.on('error', (err) => console.error('Redis Client Error', err));

export default redis;
