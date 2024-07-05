import { Module } from '@nestjs/common';
import { AdminAccomodationResolver } from './accomodation.resolver';
import { AdminAccomodationService } from './service/accomodation.service';

@Module({
  providers: [AdminAccomodationResolver, AdminAccomodationService],
})
export class AdminAccomodationModule {}
