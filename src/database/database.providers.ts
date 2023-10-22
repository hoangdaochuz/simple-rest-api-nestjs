import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3308,
        username: 'root',
        password: '280502',
        database: 'simple-rest-api-nestjs',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
