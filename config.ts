import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || '';

export default {
    mongoUrl
};