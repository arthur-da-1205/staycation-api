import { Module } from '@nestjs/common';
import { AccomodationResolver } from './accomodation.resolver';
import { AccomodationService } from './service/accomodation.service';

@Module({
  providers: [AccomodationResolver, AccomodationService],
})
export class AdminAccomodationModule {}
