import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesRepositorie {

    constructor(private readonly database: DatabaseService) { }

    create(createRoleDto: CreateRoleDto) {
        const { permissionIds, ...roleData } = createRoleDto;

        const permissionsConnection = permissionIds
            ? { connect: permissionIds.map(id => ({ id })) }
            : undefined;

        return this.database.role.upsert({
            where: { name: createRoleDto.name },
            update: {
                ...roleData as Prisma.RoleUpdateInput,
                permissions: permissionsConnection,
            },
            create: {
                ...roleData as Prisma.RoleCreateInput,
                permissions: permissionsConnection,
            },
            include: {
                permissions: true, // Optionnel : retourne les permissions liées
            }
        });
    }

    findAll() {
        return this.database.role.findMany({
            include: { permissions: true }, // Optionnel : retourne les permissions liées
        });
    }

    findOne(id: number) {
        return this.database.role.findUnique({
            where: { id }
        });
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return this.database.role.update({
            where: { id },
            data: updateRoleDto as Prisma.RoleUpdateInput
        });
    }

    remove(id: number) {
        return this.database.role.delete({
            where: { id }
        });
    }
}
