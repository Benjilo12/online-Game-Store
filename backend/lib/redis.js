import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// to store refresh tokens and other session data
export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
