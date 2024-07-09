import { Module } from '@nestjs/common';
import { UserAccommodationModule } from './accommodation/accommodation.module';
import { UserAuthModule } from './auth/auth.module';

@Module({
  imports: [UserAuthModule, UserAccommodationModule],
})
export class UserModule {}
