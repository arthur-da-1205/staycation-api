import { jwt } from '@config/jwt.config';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtOwnerStrategy } from '@strategies/jwt-owner.strategy';

@Global()
@Module({
  imports: [PassportModule, JwtModule.register(jwt)],
  providers: [JwtOwnerStrategy],
  exports: [],
})
export class CommonModule {}
