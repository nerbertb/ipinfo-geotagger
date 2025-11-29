import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);

    const hashedPassword = await bcrypt.hash('password123', 10);

    await User.create([
      {
        email: 'intern@Jlabs.com',
        password: hashedPassword,
      },
      {
        email: 'jrfullstack@Jlabs.com',
        password: hashedPassword,
      },
    ]);

    console.log('User created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error creating user:', error);
    process.exit(1);
  }
}

seedUsers();
