import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { ICourse } from './interfaces/course.interface';

@Component()
export class MainService {
  public constructor(
    @Inject('CoursesModelToken') private readonly _coursesModel: Model<ICourse>,
  ) {}

  public async getCourses(): Promise<any> {
    return await this._coursesModel.find().exec();
  }

}
