import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection Error', error.message);
    process.exit(1);
  });
