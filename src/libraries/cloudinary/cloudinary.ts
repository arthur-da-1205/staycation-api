import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

const config = new ConfigService();

const cloudName = 'dbzakr10e';
const apiKey = '548589883815591';
const apiSecret = 'bEEA_X7q9bHwZEXgZiMRGyG5ikY';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  },
};
