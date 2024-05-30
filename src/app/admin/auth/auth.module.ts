import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthResolver } from './auth.resolver';
import { AdminAuthService } from './service/auth.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [AdminAuthResolver, AdminAuthService],
})
export class AdminAuthModule {}
