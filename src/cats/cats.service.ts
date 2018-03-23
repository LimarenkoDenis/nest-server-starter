import { Component, Inject } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.entity';

@Component()
export class CatsService {
  public constructor(
    @Inject('CatModelToken') private readonly _catModel: typeof Cat,
  ) {}

  public async getCats(): Promise<Cat[]> {
    return await this._catModel.findAll<Cat>();
  }

  // tslint:disable-next-line: no-any
  public async getCat(query: any): Promise<Cat | null> {
    let cat: Cat | null;
    try {
      cat = await this._catModel.findOne<Cat>({ where: query });
    } catch (err) {
      // tslint:disable-next-line
      console.log(err);
      cat = null;
    }
    return cat;
  }

  public async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    return await this._catModel.build<Cat>(createCatDto).save();
  }

}
