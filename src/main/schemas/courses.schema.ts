import * as mongoose from 'mongoose';

export const coursesSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  }
});
