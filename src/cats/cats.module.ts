import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './schemas/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  components: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
