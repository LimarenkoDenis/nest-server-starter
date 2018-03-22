import { Cat } from './schemas/cat.entity';

// tslint:disable-next-line: no-any
export const catsProviders: any = [
  {
    provide: 'CatModelToken',
    useValue: Cat,
  },
];
