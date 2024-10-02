import { Module } from '@nestjs/common';
import { UserPropertyResolver } from './property.resolver';

@Module({
  providers: [UserPropertyResolver],
})
export class UserPropertyModule {}
