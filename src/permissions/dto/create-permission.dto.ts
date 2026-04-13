import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty({ message: 'Le nom de la permission est obligatoire' })
    @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
    @ApiProperty({example: "user:delete"})
    name?: string; //

    @IsString()
    @IsOptional()
    @ApiProperty({example: "Delete user"})
    description?: string;
}
