import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { CorsMiddleware } from '@nest-middlewares/cors';

@Module({
  imports: [AuthModule, CatsModule],
})
export class ApplicationModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
