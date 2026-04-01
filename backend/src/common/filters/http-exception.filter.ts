import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : Array.isArray((exceptionResponse as { message?: string | string[] }).message)
            ? (exceptionResponse as { message: string[] }).message.join(', ')
            : (exceptionResponse as { message?: string }).message ?? exception.message;

      response.status(status).json({
        success: false,
        message,
      } satisfies IResponse<null>);
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
    } satisfies IResponse<null>);
  }
}
