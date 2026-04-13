import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg'

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    // console.log("Ma DB URL est :", process.env.DATABASE_URL);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connexion à la base de données réussie !');
    } catch (error) {
      console.error('Erreur de connexion Prisma:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}