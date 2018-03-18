import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';

@Component()
export class AuthService {
  async createToken() {
    const expiresIn: number = 60 * 60;
    const secretOrKey: string = 'secret';
    const user: { email: string } = { email: 'thisis@example.com' };
    const token: string = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}
