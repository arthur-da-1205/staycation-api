import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthResolver } from './auth.resolver';
import { UserAuthService } from './service/auth.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [UserAuthResolver, UserAuthService],
})
export class UserAuthModule {}
