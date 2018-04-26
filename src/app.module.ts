import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { MainModule } from './main/main.module';

@Module({
  imports: [MainModule],
})
export class ApplicationModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer
    .apply(CorsMiddleware)
    .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
