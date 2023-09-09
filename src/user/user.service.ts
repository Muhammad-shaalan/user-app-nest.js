import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAllUsers(): {} {
    return {status: 1, "data": this.users};
  }

  getUserById(id: number): {} {
    const user = this.users.find(user => user.id == id);
    if(user) {
      return {status: 1, "data": user, msg: "User Is Existed"};
    } else {
      return {status: 0, "data": [], msg: "User Is Not Existed" };
    }
  }

  createUser(user: User): {} {
    user.id = this.users.length + 1
    this.users.push(user);
    return {status: 1, data: user, msg: "Created Successfully"};
  }

  updateUser(id: number, updatedUser: User): {} {
    const userIndex = this.users.findIndex(user => user.id == id);
    if (userIndex >= 0) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
      return {status: 1, data: this.users[userIndex], msg: "Updated Successfully"};
    }
    return {status: 0, data: [], msg: "This user is Not Found"};
  }

  deleteUser(id: number): {} {
    const user = this.users.findIndex(user => user.id == id);
    if (user >= 0) {
      this.users.splice(user, 1);
      return {status: 1, msg: "Deleted Successfully"};
    }
    return {status: 0, msg: "Not Found This User"};
  }
}