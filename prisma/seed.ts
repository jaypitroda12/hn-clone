import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordOne = await bcrypt.hash('password', roundsOfHashing);
  const passwordTwo = await bcrypt.hash('password', roundsOfHashing);

  const user1 = await prisma.user.create({
    data: {
      username: 'buyer',
      password: passwordOne,
      isSeller: false,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'seller',
      password: passwordTwo,
      isSeller: true,
    },
  });

  const catalog = await prisma.catalog.create({
    data: {
      sellerId: user2.id,
      products: {
        create: [
          {
            name: 'two',
            price: 50,
            sellerId: user2.id,
          },
        ],
      },
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'one',
      price: 100,
      sellerId: user2.id,
    },
  });

  console.log({ user1, user2, product1, catalog });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
