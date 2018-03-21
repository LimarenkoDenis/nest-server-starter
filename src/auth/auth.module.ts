import { DatabaseModule } from './../database/database.module';
import * as passport from 'passport';
import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authProviders } from './auth.providers';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [DatabaseModule],
  components: [AuthService, JwtStrategy, ...authProviders],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/auth/authorized', method: RequestMethod.ALL });
  }
}
