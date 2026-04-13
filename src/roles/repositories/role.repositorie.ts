import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesRepositorie {
  constructor(private readonly database: DatabaseService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { permissionIds, ...roleData } = createRoleDto;

    const permissionsConnection = permissionIds
      ? { connect: permissionIds.map((id) => ({ id })) }
      : undefined;

    return this.database.role.upsert({
      where: { name: roleData.name },
      update: {
        ...roleData,
        permissions: permissionsConnection,
      },
      create: {
        ...roleData as Prisma.RoleCreateInput,
        permissions: permissionsConnection,
      },
      include: { permissions: true },
    });
  }

  findAll() {
    return this.database.role.findMany({
      include: { permissions: true },
    });
  }

  findOne(id: number) {
    return this.database.role.findUnique({
      where: { id },
      include: { permissions: true }, // Important pour voir ce que le rôle permet
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissionIds, ...roleData } = updateRoleDto;

    // On prépare l'objet de données
    const data: any = { ...roleData };

    if (permissionIds) {
      // 'set' remplace les anciennes permissions par les nouvelles
      data.permissions = {
        set: permissionIds.map((id) => ({ id })),
      };
    }

    return this.database.role.update({
      where: { id },
      data,
      include: { permissions: true },
    });
  }

  remove(id: number) {
    return this.database.role.delete({
      where: { id },
    });
  }
}