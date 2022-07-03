import { ConfigModule, registerAs } from '@nestjs/config';

export default ConfigModule.forFeature(
  registerAs('database', () => ({
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.TEST_DB_URI
        : process.env.DB_URI,
  })),
);
