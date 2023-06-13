import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { ProductEntity } from '../../product/entities/product.entity';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../../auth/entity/user.entity';

export class OrderEntity implements Order {
  constructor({ products, buyer, ...data }: Partial<OrderEntity>) {
    Object.assign(this, data);

    if (buyer) {
      this.buyer = new UserEntity(buyer);
    }

    if (products) {
      this.products = products.map((product) => new ProductEntity(product));
    }
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ type: UserEntity })
  buyer: UserEntity;

  @ApiProperty({ type: ProductEntity, isArray: true })
  products: ProductEntity[];

  @Exclude()
  productIds: string[];

  @Exclude()
  buyerId: string;
}
