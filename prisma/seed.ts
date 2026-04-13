import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config(); // doit être AVANT tout import qui utilise process.env

const connectionString = process.env.DATABASE_URL!;
console.log(' Connexion à :', connectionString); // debug temporaire

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(' Début du seeding...');
  // 1. Création des Permissions
  const pUserRead = await prisma.permission.upsert({
    where: { name: 'user:read' },
    update: {},
    create: { name: 'user:read', description: 'Voir les utilisateurs' },
  });

  const pUserWrite = await prisma.permission.upsert({
    where: { name: 'user:write' },
    update: {},
    create: { name: 'user:write', description: 'Modifier les utilisateurs' },
  });

  // 2. Création du Rôle Admin et assignation des permissions
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {
      permissions: {
        connect: [{ id: pUserRead.id }, { id: pUserWrite.id }],
      },
    },
    create: {
      name: 'ADMIN',
      description: 'Administrateur total du système',
      permissions: {
        connect: [{ id: pUserRead.id }, { id: pUserWrite.id }],
      },
    },
  });

  // 3. Création d'un utilisateur test avec le rôle ADMIN
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@system.com' },
    update: {},
    create: {
      email: 'admin@system.com',
      name: 'Super Admin',
      password: 'votre_mot_de_passe_hache', 
      roles: {
        connect: { id: adminRole.id },
      },
    },
  });

  console.log(' Données insérées :', { adminUser: adminUser.email, role: adminRole.name });
  console.log(' Seeding terminé avec succès !');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(' Erreur lors du seeding :', e);
    await prisma.$disconnect();
    process.exit(1);
  });