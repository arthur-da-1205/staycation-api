import { Module } from '@nestjs/common';
import { UserPersonalResolver } from './personal.resolver';

@Module({
  providers: [UserPersonalResolver],
})
export class PersonalModule {}
