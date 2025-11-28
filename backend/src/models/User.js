import { Schema } from 'mongoose';

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    }
})