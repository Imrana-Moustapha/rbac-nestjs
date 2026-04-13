import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionsRepositorie {

    constructor(private readonly database: DatabaseService) { }

    async create(createPermissionDto: CreatePermissionDto) {

        const permission = {...createPermissionDto as Prisma.PermissionCreateInput};

        return this.database.permission.upsert({
            where: {
                name: createPermissionDto.name
            },
            update: {
                description: createPermissionDto.description,
            },
            create: {
                name: permission.name,
                description: permission.description
            },
        });
    }

    async findAll() {
        return this.database.permission.findMany();
    }

    async findOne(id: number) {
        return this.database.permission.findUnique({
            where: { id }
        });
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        return this.database.permission.update({
            where: { id },
            data: { ...updatePermissionDto as Prisma.PermissionUpdateInput }
        });
    }

    async remove(id: number) {
        return this.database.permission.delete({
            where: { id }
        });
    }
}
