import { ConfigService } from '@nestjs/config';
import { compare as compareBcrypt, hash as hashBcrypt } from 'bcrypt';
import * as crypto from 'crypto';
import SimpleCrypto from 'simple-crypto-js';

const config = new ConfigService();

const simpleCrypto = new SimpleCrypto(config.get('ENCRYPT_KEY'));

export const encrypt = (payload: any) => {
  return simpleCrypto.encrypt(payload);
};

export const decrypt = (payload: string) => {
  return simpleCrypto.decrypt(payload);
};

export const hash = (payload: string): Promise<string> => {
  return hashBcrypt(payload, 10);
};

export const hashAreEqual = (
  hashedText: string,
  plainText: string,
): Promise<boolean> => {
  return compareBcrypt(plainText, hashedText);
};

export const md5 = (text: string) => {
  const hash256 = crypto.createHash('md5');
  hash256.update(text);

  return hash256.digest('hex');
};

export const sha256 = (text: string) => {
  const hash256 = crypto.createHash('sha256');
  hash256.update(text);

  return hash256.digest('hex');
};

export const hmac256 = (text: string, key: string) => {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(text);

  return hmac.digest('hex');
};

export const hmacAreEqual = (a: string, b: string) => {
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
};
