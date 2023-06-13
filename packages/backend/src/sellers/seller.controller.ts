import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Catalog, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { AllowedRoles, RequestUser } from '../decorators';
import { CatalogEntity } from './entities/catalog.entity';
import { OrderEntity } from './entities/orders.entity';
import { SellerService } from './seller.service';

@Controller('seller')
@ApiTags('seller')
@UseGuards(JwtAuthGuard, RolesGuard)
@AllowedRoles(true)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('create-catalog')
  @ApiCreatedResponse({ type: CatalogEntity })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add products created by seller to catalog' })
  async create(
    @Body() productIds: string[],
    @RequestUser() user: User
  ): Promise<Catalog> {
    return this.sellerService.create(user.id, productIds);
  }

  @Get('orders')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all orders' })
  async getAllOrders(@RequestUser() user: User): Promise<OrderEntity[]> {
    const orders = await this.sellerService.getAllOrders(user.id);
    return orders.map((order) => new OrderEntity(order));
  }
}
