import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserEntity } from '../auth/entity/user.entity';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { AllowedRoles, RequestUser } from '../decorators';
import { CatalogEntity } from '../sellers/entities/catalog.entity';
import { OrderEntity } from '../sellers/entities/orders.entity';
import { BuyerService } from './buyer.service';

@Controller('buyer')
@ApiTags('buyer')
export class BuyerController {
  constructor(private buyerService: BuyerService) {}

  @Get('list-of-sellers')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getSellers(): Promise<UserEntity[]> {
    const sellers = await this.buyerService.getSellers();
    return sellers.map((user) => new UserEntity(user));
  }

  @Get('seller-catalog/:sellerId')
  @ApiOkResponse({ type: CatalogEntity })
  async getSellerCatalog(
    @Param('sellerId') sellerId: string
  ): Promise<CatalogEntity> {
    const catalog = await this.buyerService.getSellerCatalog(sellerId);
    return new CatalogEntity(catalog);
  }

  @Post('create-order/:sellerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiBody({ type: String, isArray: true })
  @AllowedRoles(false)
  async createOrder(
    @Param('sellerId') sellerId: string,
    @Body() productIds: string[],
    @RequestUser() user: User
  ): Promise<OrderEntity> {
    const order = await this.buyerService.createOrder(
      user.id,
      sellerId,
      productIds
    );
    return new OrderEntity(order);
  }
}
