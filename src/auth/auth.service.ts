import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as config from 'config';
import { IUserData, IUserModel } from './interfaces/user.interface';

@Component()
export class AuthService {
  public constructor(
    @Inject('UserModelToken') private readonly _userModel: Model<IUserModel>,
  ) {}

  public async createToken(user: IUserData): Promise<IUserData> {
    const { time }: Config['expireTime'] = config.get('expireTime');
    const { secret }: Config['jwtConf'] = config.get('jwtConf');
    const expiresIn: number = Date.now() + time;

    const payload: { login: string | undefined, expiresIn: number, isRemembered: boolean | undefined } = {
      login: user.email,
      expiresIn,
      isRemembered: user.remember,
    };

    const accessToken: string = jwt.sign(payload, secret, { expiresIn });

    return {
      ...user,
      expiresIn,
      accessToken,
    };
  }

  public async validateUser(email: string): Promise<boolean> {
    const user: IUserData | null = await this.getUser({email});

    if (!user) {
      return false;
    }
    return true;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<IUserModel> {
    const createdUser: IUserModel = new this._userModel(createUserDto);
    return await createdUser.save();
  }

  // tslint:disable-next-line
  public async getUser(query: any): Promise<IUserData | null> {
    let user: IUserData | null;
    try {
      user = await this._userModel.findOne(query);
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      user = null;
    }
    return user;
  }

  // tslint:disable-next-line: no-any
  public async getUserWithToken(query: any, update?: any): Promise<IUserData> {
    let user: IUserData;
    if (update) {
      user = await this._userModel.findOneAndUpdate(query, update, { new: true }).lean();
    } else {
      user = await this._userModel.findOne(query).lean();
    }

    return await this.createToken(user);
  }

}
