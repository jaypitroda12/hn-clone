import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';

@Module({
  controllers: [BuyerController],
  providers: [BuyerService],
  imports: [PrismaModule],
})
export class BuyerModule {}
