import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { ICat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Component()
export class CatsService {
  public constructor(
    @Inject('CatModelToken') private readonly _catModel: Model<ICat>,
  ) {}

  public async getCats(): Promise<ICat[]> {
    return await this._catModel.find().exec();
  }

  // tslint:disable-next-line: no-any
  public async getCat(query: any): Promise<ICat | null> {
    let cat: ICat | null;
    try {
      cat = await this._catModel.findOne(query);
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      cat = null;
    }
    return cat;
  }

  public async createCat(createCatDto: CreateCatDto): Promise<ICat> {
    const createdCat: ICat = new this._catModel(createCatDto);
    return await createdCat.save();
  }

}
