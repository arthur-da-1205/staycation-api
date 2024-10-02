import { Module } from '@nestjs/common';
import { UserAuthModule } from './auth/auth.module';
import { UserFavouriteModule } from './favourite/favourite.module';
import { PersonalModule } from './personal/personal.module';
import { UserPropertyModule } from './property/property.module';

@Module({
  imports: [
    UserAuthModule,
    UserPropertyModule,
    PersonalModule,
    UserFavouriteModule,
  ],
})
export class UserModule {}
