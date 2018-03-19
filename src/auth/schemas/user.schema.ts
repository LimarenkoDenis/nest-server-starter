import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (surname: string) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(surname),
      message: '{VALUE} is not a valid login!',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    validate: {
      validator: (password: string) => /^[A-Za-z0-9!@#$^&-_+=;:,.?|`~<>',]{6,20}/.test(password),
      message: '{VALUE} is not a valid password!',
    },
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
    validate: {
      validator: (name: string) => /^[а-яА-ЯёЁa-zA-Z0-9-\s]+$/.test(name),
      message: '{VALUE} is not a valid name!',
    },
  },
  surname: {
    type: String,
    maxlength: 50,
    validate: {
      validator: (surname: string) => /^[а-яА-ЯёЁa-zA-Z0-9-\s]+$/.test(surname),
      message: '{VALUE} is not a valid surname!',
    },
  },
  hash: String,
});
