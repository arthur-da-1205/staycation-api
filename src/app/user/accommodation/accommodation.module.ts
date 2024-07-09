import { Module } from '@nestjs/common';
import { UserAccommodationResolver } from './accommodation.resolver';

@Module({
  providers: [UserAccommodationResolver],
})
export class UserAccommodationModule {}
