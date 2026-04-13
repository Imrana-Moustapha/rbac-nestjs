import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Imrana Moustapha' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  name?: string;

  @ApiProperty({ example: 'imrana@example.ne' })
  @IsEmail({}, { message: 'Email invalide' })
  email?: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password?: string;

  @ApiProperty({ 
    example: [1], 
    description: 'Liste des IDs des rôles à attribuer',
    required: false 
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  roleIds?: number[];
}