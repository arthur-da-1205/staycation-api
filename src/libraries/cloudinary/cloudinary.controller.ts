// src/upload/upload.controller.ts
import { FileInterceptor } from '@nest-lab/fastify-multer';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('upload')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Buffer) {
    try {
      const result = await this.cloudinaryService.uploadFile(file.buffer);
      return { url: result.url };
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  }
}
