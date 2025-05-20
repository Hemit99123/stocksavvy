import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

// Create Redis client for redis-om (sessions) without immediately connecting
export const redisOMClient = createClient({
    url: process.env.REDIS_ENDPOINT
});

// Create Redis client for OTP operations without immediately connecting
export const redisClient = createClient({
    url: process.env.REDIS_ENDPOINT
});

// Connection management functions for redisOMClient (sessions)
export const connectRedis = async () => {
    try {
        if (!redisOMClient.isOpen) {
            await redisOMClient.connect();
        }
        return redisOMClient;
    } catch (error) {
        console.error("Redis session connection failed:", error);
        throw error;
    }
};

export const disconnectRedis = async () => {
    try {
        if (redisOMClient.isOpen) {
            await redisOMClient.quit();
        }
    } catch (error) {
        console.error("Redis session disconnection failed:", error);
    }
};

// Connection management functions for redisClient (OTP)
export const connectOTPRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        return redisClient;
    } catch (error) {
        console.error("Redis OTP connection failed:", error);
        throw error;
    }
};

export const disconnectOTPRedis = async () => {
    try {
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
    } catch (error) {
        console.error("Redis OTP disconnection failed:", error);
    }
};
