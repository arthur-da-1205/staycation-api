import multer from 'fastify-multer';

// Set up Multer storage options
const storage = multer.memoryStorage();

export const uploader = multer({ storage }) as any;
