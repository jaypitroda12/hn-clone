import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { AllowedRoles, RequestUser } from '../decorators';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
@UseGuards(JwtAuthGuard, RolesGuard)
@AllowedRoles(true)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOkResponse({ type: ProductEntity })
  @ApiBearerAuth()
  create(
    @RequestUser() user: User,
    @Body() dto: CreateProductDto
  ): Promise<ProductEntity> {
    return this.productService.create(user.id, dto);
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  @ApiBearerAuth()
  async getAllProducts(@RequestUser() user: User): Promise<ProductEntity[]> {
    const products = await this.productService.findAll(user.id);
    return products.map((product) => new ProductEntity(product));
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @RequestUser() user: User,
    @Body() dto: UpdateProductDto
  ) {
    return this.productService.update(id, user.id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string, @RequestUser() user: User) {
    return this.productService.remove(id, user.id);
  }
}
