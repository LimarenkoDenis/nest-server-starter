import * as passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Component } from '@nestjs/common';
import * as config from 'config';
import { NextFunction, Request } from 'express';
const { secret }: Config['jwtConf'] = config.get('jwtConf');
import { AuthService } from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {
  public constructor(private readonly _authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: secret,
      },
      // tslint:disable-next-line: no-any
      async (req: Request, payload: any, next: NextFunction) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  // tslint:disable-next-line: no-any
  public async verify(req: Request, payload: any, done: VerifiedCallback): Promise<void> {
    const isValid: boolean = await this._authService.validateUser(payload.login);

    if (!isValid) {
      return done(null, false);
    }
    return done(null, payload);
  }
}
