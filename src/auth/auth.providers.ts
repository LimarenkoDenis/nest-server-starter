import { User } from './schemas/user.entity';

// tslint:disable-next-line: no-any
export const authProviders: any = [
  {
    provide: 'UserModelToken',
    useValue: User,
  },
];
