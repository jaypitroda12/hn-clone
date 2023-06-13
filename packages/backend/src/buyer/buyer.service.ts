import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BuyerService {
  constructor(private prisma: PrismaService) {}

  async getSellers() {
    return this.prisma.user.findMany({ where: { isSeller: true } });
  }

  async getSellerCatalog(sellerId: string) {
    return this.prisma.catalog.findUnique({
      where: { sellerId },
      include: { products: true },
    });
  }

  async createOrder(buyerId: string, sellerId: string, productIds: string[]) {
    const products = await this.prisma.product.findMany({
      where: { AND: { id: { in: productIds }, catalog: { sellerId } } },
    });

    if (products.length === 0) {
      throw new BadRequestException('Products not found for this seller');
    }

    return this.prisma.order.create({
      data: {
        buyer: { connect: { id: buyerId } },
        products: { connect: productIds.map((id) => ({ id })) },
      },
      include: { products: true },
    });
  }
}
