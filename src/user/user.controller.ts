import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
// import { User } from './user.model';
import { User } from './user.entity';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): {} {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): {} {
    return this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: User): {} {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: number, @Body() user: User): {} {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): {} {
    return this.userService.deleteUser(id);
  }
}