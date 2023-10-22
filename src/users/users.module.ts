import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userService } from './user.service';
import { usersController } from './users.controller';
@Module({
  providers: [userService, ...usersProviders],
  controllers: [usersController],
  exports: [],
  imports: [DatabaseModule],
})
export class UserModule {}
