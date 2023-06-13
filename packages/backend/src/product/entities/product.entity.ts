import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ProductEntity implements Product {
  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);

    this.isInCatalog = !!partial.catalogId;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional()
  isInCatalog?: boolean;

  @Exclude()
  @ApiHideProperty()
  sellerId: string;

  @Exclude()
  @ApiHideProperty()
  orderId: string;

  @Exclude()
  @ApiHideProperty()
  catalogId: string;
}
