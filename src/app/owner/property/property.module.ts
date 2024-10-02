import { Module } from '@nestjs/common';
import { OwnerPropertynResolver } from './property.resolver';
import { OwnerPropertyService } from './service/property.service';

@Module({
  providers: [OwnerPropertynResolver, OwnerPropertyService],
})
export class OwnerPropertyModule {}
