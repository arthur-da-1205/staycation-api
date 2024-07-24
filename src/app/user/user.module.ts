import { Module } from '@nestjs/common';
import { UserAccommodationModule } from './accommodation/accommodation.module';
import { UserAuthModule } from './auth/auth.module';
import { UserFavouriteModule } from './favourite/favourite.module';
import { PersonalModule } from './personal/personal.module';

@Module({
  imports: [
    UserAuthModule,
    UserAccommodationModule,
    PersonalModule,
    UserFavouriteModule,
  ],
})
export class UserModule {}
