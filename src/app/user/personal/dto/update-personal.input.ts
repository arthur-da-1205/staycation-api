import { CreatePersonalInput } from './create-personal.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePersonalInput extends PartialType(CreatePersonalInput) {
  id: number;
}
