import { jwt } from '@config/jwt.config';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAdminStrategy } from '@strategies/jwt-admin.strategy';

@Global()
@Module({
  imports: [PassportModule, JwtModule.register(jwt)],
  providers: [JwtAdminStrategy],
  exports: [],
})
export class CommonModule {}
