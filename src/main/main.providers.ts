import { Connection } from 'mongoose';
import { coursesSchema } from './schemas/courses.schema';

// tslint:disable-next-line: no-any
export const mainProviders: any = [
  {
    provide: 'CoursesModelToken',
    useFactory: (connection: Connection) => connection.model('CoursesModel', coursesSchema),
    inject: ['DbConnectionToken'],
  },
];
