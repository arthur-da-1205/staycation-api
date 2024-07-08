import { Module } from '@nestjs/common';
import { OwnerAccomodationModule } from './accomodation/accomodation.module';
import { OwnerAuthModule } from './auth/auth.module';

@Module({
  imports: [OwnerAuthModule, OwnerAccomodationModule],
})
export class OwnerModule {}
