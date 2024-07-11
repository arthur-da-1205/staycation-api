import { Module } from '@nestjs/common';
import { UserAccommodationModule } from './accommodation/accommodation.module';
import { UserAuthModule } from './auth/auth.module';
import { PersonalModule } from './personal/personal.module';

@Module({
  imports: [UserAuthModule, UserAccommodationModule, PersonalModule],
})
export class UserModule {}
