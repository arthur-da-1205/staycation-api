import { Module } from '@nestjs/common';
import { AdminAuthModule } from './auth/auth.module';
import { AdminAccomodationModule } from './accomodation/accomodation.module';

@Module({
  imports: [AdminAuthModule, AdminAccomodationModule],
})
export class AdminModule {}
