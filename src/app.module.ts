import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import ConfigurationModule from './Configurations/Config/config.module';
import DatabaseModule from './Configurations/Database/database.module';
import { HealthModule } from './Server/Health/health.module';
import LoggerMiddleware from './Common/Middleware/logger.middleware';
import { ModelModule } from './Server';

@Module({
  imports: [ConfigurationModule, DatabaseModule, HealthModule, ModelModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
