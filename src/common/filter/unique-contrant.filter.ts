import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UniqueConstraintError } from 'sequelize';

@Catch(UniqueConstraintError)
export class UniqueConstraintFilter implements ExceptionFilter {
  catch(exception: UniqueConstraintError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const message = exception.errors.map(err => `${err.path} is already taken.`).join(', ');
    const statusCode = HttpStatus.CONFLICT;

    response.status(statusCode).json({
      statusCode,
      message,
      error: 'Conflict',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
