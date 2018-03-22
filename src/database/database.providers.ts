import * as config from 'config';
import { Sequelize } from 'sequelize-typescript';
import { Cat } from '../cats/schemas/cat.entity';

// tslint:disable-next-line
export const databaseProviders: any = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const mysqlConifg: Config['mysqlConifg'] = config.get('mysqlConifg');
      const sequelize: Sequelize = new Sequelize(mysqlConifg);
      sequelize.addModels([Cat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
