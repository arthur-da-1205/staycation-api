import { Module } from '@nestjs/common';
import { OwnerAuthModule } from './auth/auth.module';
import { OwnerPropertyModule } from './property/property.module';

@Module({
  imports: [OwnerAuthModule, OwnerPropertyModule],
})
export class OwnerModule {}
