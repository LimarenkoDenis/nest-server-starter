import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Component()
export class AuthService {
  public constructor(
    @Inject('UserModelToken') private readonly _userModel: Model<User>,
  ) {}

  public async createToken() {
    const expiresIn: number = 60 * 60;
    const secretOrKey: string = 'secret';
    const user: { email: string } = { email: 'thisis@example.com' };
    const token: string = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  public async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this._userModel(createUserDto);
    return await createdUser.save();
  }

  // tslint:disable-next-line
  public async getUser(query: any): Promise<User | null> {
    let user: User | null;
    try {
      user = await this._userModel.findOne(query);
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      user = null;
    }
    return user;
  }

}
