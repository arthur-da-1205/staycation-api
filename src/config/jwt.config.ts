import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const jwt = {
  // secret: config.get('JWT_SECRET'),
  secret: 'secret',
  expiresIn: '24h',
};
