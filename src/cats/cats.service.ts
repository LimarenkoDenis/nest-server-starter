import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './schemas/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Component()
export class CatsService {
  public constructor(
    @InjectRepository(Cat) private readonly _catModel: Repository<Cat>,
  ) {}

  public async getCats(): Promise<Cat[]> {
    return await this._catModel.find();
  }

  // tslint:disable-next-line: no-any
  public async getCat(query: any): Promise<Cat | undefined> {
    let cat: Cat | undefined;
    try {
      cat = await this._catModel.findOne(query);
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      cat = undefined;
    }
    return cat;
  }

  public async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    return await this._catModel.create(createCatDto);
  }

}
