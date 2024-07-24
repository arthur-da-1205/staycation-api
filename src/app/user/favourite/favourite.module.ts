import { Module } from '@nestjs/common';
import { UserFavouriteResolver } from './favourite.resolver';

@Module({
  providers: [UserFavouriteResolver],
})
export class UserFavouriteModule {}
