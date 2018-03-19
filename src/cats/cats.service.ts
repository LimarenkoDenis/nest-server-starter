import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Component()
export class CatsService {
  public constructor(
    @Inject('CatModelToken') private readonly _catModel: Model<Cat>,
  ) {}

  public async getCats(): Promise<Cat[]> {
    return await this._catModel.find().exec();
  }

  public async getCat(query): Promise<Cat | null> {
    let cat: Cat | null;
    try {
      cat = await this._catModel.findOne(query);
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      cat = null;
    }
    return cat;
  }

  public async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this._catModel(createCatDto);
    return await createdCat.save();
  }

}
