import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositorie } from './repositories/user.repositorie';

@Injectable()
export class UsersService {

  constructor(private readonly userRepositorie: UsersRepositorie) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepositorie.create(createUserDto);
  }

  findAll() {
    return this.userRepositorie.findAll();
  }

  findOne(id: number) {
    return this.userRepositorie.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepositorie.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepositorie.remove(id);
  }
}
