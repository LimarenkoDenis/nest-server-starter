import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [AuthModule, CatsModule],
})
export class ApplicationModule {}
