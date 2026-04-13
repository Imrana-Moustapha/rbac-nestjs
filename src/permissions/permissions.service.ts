import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsRepositorie } from './repositories/permissions.repositories';

@Injectable()
export class PermissionsService {

  constructor(private readonly permissionsRepositories: PermissionsRepositorie) { }

  create(createPermissionDto: CreatePermissionDto) {
    return this.permissionsRepositories.create(createPermissionDto);
  }

  findAll() {
    return this.permissionsRepositories.findAll();
  }

  findOne(id: number) {
    return this.permissionsRepositories.findOne(id);
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsRepositories.update(id, updatePermissionDto);
  }

  remove(id: number) {
    return this.permissionsRepositories.remove(id);
  }
}
