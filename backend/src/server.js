import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 8000;
const DB_URI = 'mongodb://localhost:8000/api/'


app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

