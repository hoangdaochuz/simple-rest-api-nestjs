import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Res,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
@Controller('users')
export class usersController {
  constructor(private userService: userService) {}
  @Get()
  async getAllUser(@Req() req: Request, @Res() res: Response): Promise<User[]> {
    try {
      const users = await this.userService.getAllUser();
      res.status(HttpStatus.OK).json(users);
      return users;
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.BAD_REQUEST);
    }
  }
  @Post()
  async addUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.addUser(createUserDto);
      res.status(HttpStatus.OK).json(user);
      return user;
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User[]> {
    try {
      const user = await this.userService.updateUser(id, updateUserDto);
      res
        .status(HttpStatus.OK)
        .json({ message: 'Update successfully', data: user });
      return user;
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.userService.deleteUser(id);
      res.status(HttpStatus.OK).json({ message: 'delete user successfully' });
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.BAD_REQUEST);
    }
  }
}
