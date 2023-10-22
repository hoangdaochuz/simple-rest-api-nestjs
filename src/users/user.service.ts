import { Injectable, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Sequelize } from 'sequelize';
@Injectable()
export class userService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}
  async getAllUser(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
  async addUser(createUserDto: any): Promise<User> {
    return await this.usersRepository.create(createUserDto);
  }
  async updateUser(id: number, data: any): Promise<User[]> {
    const [numOfAffectedRows, updatedRecords] =
      await this.usersRepository.update(data, {
        where: { id },
        returning: true,
      });
    if (numOfAffectedRows > 0) {
      return updatedRecords;
    } else {
      return null;
    }
  }
  async deleteUser(id: number): Promise<any> {
    const transaction = await this.sequelize.transaction();
    try {
      await this.usersRepository.destroy({ where: { id }, transaction });
      await transaction.commit();
    } catch (e) {
      console.error(e);
      await transaction.rollback();
    }
  }
}
