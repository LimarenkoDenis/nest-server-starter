import { Document } from 'mongoose';

export interface ICourse extends Document {
  readonly title: string;
}

