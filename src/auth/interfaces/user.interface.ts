import { Document } from 'mongoose';

export interface IUserModel extends Document {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly surname: string;
}

export interface IUserData {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly surname: string;
  readonly remember?: boolean;
  readonly expiresIn?: number;
  readonly accessToken?: string;
}
