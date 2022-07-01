import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
// import { LogTypes } from '../../Server/Log/Types/log';
// import { LogService } from '../../Server/Log/log.service';
// import { CreateLogDto } from '../../Server/Log/Validation/create-log.Validation';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  // constructor(private readonly logService: LogService) {}
  private readonly logger = new Logger('Custom HTTP Logger');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', async () => {
      const { method, originalUrl } = request;
      const userAgent = request.get('user-agent');
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} from client: ${userAgent}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LoggerMiddleware;
