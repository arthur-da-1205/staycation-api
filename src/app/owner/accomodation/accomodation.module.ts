import { Module } from '@nestjs/common';
import { OwnerAccomodationResolver } from './accomodation.resolver';
import { OwnerAccomodationService } from './service/accomodation.service';

@Module({
  providers: [OwnerAccomodationResolver, OwnerAccomodationService],
})
export class OwnerAccomodationModule {}
