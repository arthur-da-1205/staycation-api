import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

const config = new ConfigService();

const NAME = config.get('CLOUDINARY_NAME');
const KEY = config.get('CLOUDINARY_API_KEY');
const SECRET = config.get('CLOUDINARY_API_SECRET');

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: NAME,
      api_key: KEY,
      api_secret: SECRET,
    });
  },
};
