import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request:');
    console.log({
      authorization: req.headers.authorization,
      method: req.method,
      baseUrl: req.baseUrl,
      query: req.query,
      body: req.body,
    });

    next();
  }
}
