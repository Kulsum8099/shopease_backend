// config.ts
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
  access_token: process.env.JWT_SECRET,
  refresh_token: process.env.REFRESH_SECRET,

  // SSLCommerz configuration
  sslcommerz: {
    store_id: process.env.SSLCOMMERZ_STORE_ID,
    store_password: process.env.SSLCOMMERZ_STORE_PASSWORD,
    payment_url: process.env.SSLCOMMERZ_PAYMENT_URL,
    validation_url: process.env.SSLCOMMERZ_VALIDATION_URL,
    sandbox: process.env.SSLCOMMERZ_SANDBOX === 'true',
  },

  // Server URLs
  server_url: process.env.SERVER_URL,
  client_url: process.env.CLIENT_URL,

  // Email configuration (optional)
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  },

  // File upload configuration
  upload: {
    max_file_size: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
    allowed_file_types: process.env.ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/webp',
    ],
    upload_path: process.env.UPLOAD_PATH || 'uploads',
  },
};
