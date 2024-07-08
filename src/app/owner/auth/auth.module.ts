import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OwnerAuthResolver } from './auth.resolver';
import { OwnerAuthService } from './service/auth.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [OwnerAuthResolver, OwnerAuthService],
})
export class OwnerAuthModule {}
