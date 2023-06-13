import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  controllers: [SellerController],
  providers: [SellerService],
  imports: [PrismaModule],
})
export class SellerModule {}
