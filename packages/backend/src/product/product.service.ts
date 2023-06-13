import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(sellerId: string, { name, price }: CreateProductDto) {
    return this.prisma.product.create({
      data: { name, price, seller: { connect: { id: sellerId } } },
    });
  }

  findAll(sellerId: string) {
    return this.prisma.product.findMany({
      where: { sellerId },
    });
  }

  async update(id: string, sellerId: string, dto: UpdateProductDto) {
    const result = await this.prisma.product.updateMany({
      data: { ...dto },
      where: { id, sellerId },
    });

    if (result.count !== 1) {
      throw new BadRequestException('Failed to update product');
    }
  }

  async remove(id: string, sellerId: string) {
    const result = await this.prisma.product.deleteMany({
      where: { id, sellerId, order: { is: null } },
    });

    if (result.count !== 1) {
      throw new BadRequestException('Failed to remove product');
    }
  }
}
