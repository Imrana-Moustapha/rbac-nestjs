import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepositorie } from './repositories/role.repositorie';

@Injectable()
export class RolesService {

  constructor(private readonly rolesRepositorie: RolesRepositorie) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesRepositorie.create(createRoleDto);
  }

  findAll() {
    return this.rolesRepositorie.findAll();
  }

  findOne(id: number) {
    return this.rolesRepositorie.findOne(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.rolesRepositorie.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.rolesRepositorie.remove(id);
  }
}
