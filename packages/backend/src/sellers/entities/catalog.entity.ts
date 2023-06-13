import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Catalog } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ProductEntity } from '../../product/entities/product.entity';

export class CatalogEntity implements Catalog {
  constructor({ products, ...data }: Partial<CatalogEntity>) {
    Object.assign(this, data);

    if (products) {
      this.products = products.map((product) => new ProductEntity(product));
    }
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  sellerId: string;

  @ApiHideProperty()
  @Exclude()
  productIds: string[];

  @ApiProperty({ type: ProductEntity, isArray: true })
  products: ProductEntity[];
}
