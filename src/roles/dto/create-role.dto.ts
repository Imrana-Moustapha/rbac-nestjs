import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: 'MANAGER' })
    @IsString()
    @IsNotEmpty({ message: 'Le nom du rôle est obligatoire' })
    name?: string;

    @ApiProperty({ example: 'Gère les stocks de la pharmacie', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: [1, 2, 3], description: 'Liste des IDs des permissions' })
    @IsArray()
    @IsInt({ each: true }) // Vérifie que chaque élément du tableau est un entier
    @IsOptional()
    permissionIds?: number[];
}
