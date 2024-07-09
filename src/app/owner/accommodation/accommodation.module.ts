import { Module } from '@nestjs/common';
import { OwnerAccomodationResolver } from './accommodation.resolver';
import { OwnerAccomodationService } from './service/accommodation.service';

@Module({
  providers: [OwnerAccomodationResolver, OwnerAccomodationService],
})
export class OwnerAccomodationModule {}
