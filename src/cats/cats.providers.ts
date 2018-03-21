import { Connection } from 'mongoose';
import { catSchema } from './schemas/cat.schema';

// tslint:disable-next-line: no-any
export const catsProviders: any = [
  {
    provide: 'CatModelToken',
    useFactory: (connection: Connection) => connection.model('Cat', catSchema),
    inject: ['DbConnectionToken'],
  },
];
