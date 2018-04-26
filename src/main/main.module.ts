import { mainProviders } from './main.providers';
import { MainController } from './main.controller';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { MainService } from './main.service';

@Module({
  imports: [DatabaseModule],
  components: [MainService, ...mainProviders],
  controllers: [MainController],
})
export class MainModule {

}
