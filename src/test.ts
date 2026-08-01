//drivers y adaptadores de postgre
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

//creamos el pool de conexiones nativo con la URL del .env
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

//envolvemos el pool en el adaptador de Prisma
const adapter = new PrismaPg(pool);

//pasamos el adaptador dentro del constructor del cliente
const prisma = new PrismaClient({ adapter });

async function main() {
  const propiedad = await prisma.propiedad.create({
    data: {
      titulo: 'Departamento céntrico',
      descripcion: 'Luminoso y moderno',
      enVenta: true,
      precioVenta: 90000,
      m2: 50,
      ambientes: 2,
      habitaciones: 1,
      banos: 1,
      imagenes: {
        create: [{ url: 'https://ejemplo.com/foto1.jpg', esPrincipal: true }]
      }
    },
  });
  console.log('Propiedad guardada con ID:', propiedad.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });