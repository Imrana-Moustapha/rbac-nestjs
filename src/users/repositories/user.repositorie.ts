import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepositorie {
  constructor(private readonly database: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { roleIds, password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.database.user.create({
      data: {
        ...userData as Prisma.UserCreateInput,
        password: hashedPassword,
        roles: roleIds ? {
          connect: roleIds.map((id) => ({ id })),
        } : undefined,
      },
      include: { roles: true },
    });
  }

  async findAll() {
    return this.database.user.findMany({
      include: {
        roles: {
          include: { permissions: true }, // Utile pour voir les permissions réelles
        },
      },
    });
  }

  async findOne(id: number) {
    return this.database.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: { permissions: true },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roleIds, password, ...userData } = updateUserDto;

    // Construction dynamique de l'objet data pour éviter le "any"
    const data: any = { ...userData };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    if (roleIds) {
      data.roles = {
        set: roleIds.map((roleId) => ({ id: roleId })),
      };
    }

    return this.database.user.update({
      where: { id },
      data,
      include: { roles: true },
    });
  }

  async remove(id: number) {
    return this.database.user.delete({
      where: { id },
    });
  }
}