import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async create(sellerId: string, productIds: string[]) {
    const products = await this.prisma.product.findMany({
      where: { sellerId },
    });

    const addProductsInCatalog: { id: string }[] = [];
    const removeProductsFromCatalog: { id: string }[] = [];

    products.forEach((product) =>
      productIds.includes(product.id)
        ? addProductsInCatalog.push({ id: product.id })
        : removeProductsFromCatalog.push({ id: product.id })
    );

    return this.prisma.catalog.upsert({
      create: {
        seller: { connect: { id: sellerId } },
        products: {
          connect: addProductsInCatalog,
        },
      },
      update: {
        products: {
          connect: addProductsInCatalog,
          disconnect: removeProductsFromCatalog,
        },
      },
      where: { sellerId },
    });
  }

  async getAllOrders(sellerId: string) {
    return this.prisma.order.findMany({
      where: { products: { every: { sellerId } } },
      include: { buyer: true, products: true },
    });
  }
}
