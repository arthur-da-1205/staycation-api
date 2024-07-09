import { Module } from '@nestjs/common';
import { OwnerAccomodationModule } from './accommodation/accommodation.module';
import { OwnerAuthModule } from './auth/auth.module';

@Module({
  imports: [OwnerAuthModule, OwnerAccomodationModule],
})
export class OwnerModule {}
