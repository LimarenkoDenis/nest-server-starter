import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as config from 'config';
import { User } from './schemas/user.entity';

@Component()
export class AuthService {
  public constructor(
    @Inject('UserModelToken') private readonly _userModel: typeof User,
  ) {}

  public async createToken(user: UserData): Promise<UserData> {
    const { time }: Config['expireTime'] = config.get('expireTime');
    const { secret }: Config['jwtConf'] = config.get('jwtConf');
    const expiresIn: number = Date.now() + time;

    const payload: { login: string | undefined, expiresIn: number } = {
      login: user.email,
      expiresIn,
    };

    const accessToken: string = jwt.sign(payload, secret, { expiresIn });

    return {
      ...user,
      expiresIn,
      accessToken,
    };
  }

  public async validateUser(email: string): Promise<boolean> {
    const user: UserData | null = await this._userModel.findOne({ where: {email} });
    if (!user) {
      return false;
    }
    return true;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserData> {
    const user: User = await this._userModel.build<User>(createUserDto).save();
    return await this.createToken(user.dataValues as User);
  }

  // tslint:disable-next-line
  public async getUser(query: any): Promise<User | null> {
    let user: User | null;
    try {
      user = await this._userModel.findOne({ where: query });
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      user = null;
    }
    return user;
  }

  // tslint:disable-next-line: no-any
  public async getUserWithToken(query: any): Promise<UserData> {
    const user: User = await this._userModel.findOne<User>({ where: query }) as User;
    return await this.createToken(user.dataValues as UserData);
  }

}
