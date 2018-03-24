import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as config from 'config';
import { User } from './schemas/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Component()
export class AuthService {
  public constructor(
    @InjectRepository(User) private readonly _userModel: Repository<User>,
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
    const user: UserData | undefined = await this._userModel.findOne({ email });
    if (!user) {
      return false;
    }
    return true;
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserData> {
    const user: User = await this._userModel.create(createUserDto);
    const newUser: User = await this._userModel.save(user);
    return await this.createToken(newUser);
  }

  // tslint:disable-next-line
  public async getUser(query: any): Promise<User | undefined> {
    let user: User | undefined;
    try {
      user = await this._userModel.findOne(query);
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      user = undefined;
    }
    return user;
  }

  // tslint:disable-next-line: no-any
  public async getUserWithToken(query: any): Promise<UserData> {
    const user: User = await this._userModel.findOne(query) as User;
    return await this.createToken(user);
  }

}
