import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SellerModule } from './sellers/seller.module';
import { AuthModule } from './auth/auth.module';
import { BuyerModule } from './buyer/buyer.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, SellerModule, AuthModule, BuyerModule, SellerModule, ProductModule],
})
export class AppModule {}
