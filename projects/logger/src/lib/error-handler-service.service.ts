import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class ErrorHandlerServiceService implements ErrorHandler {

  constructor(private readonly logger: LoggerService) {
    console.log('errror logger', this.logger)
   }

  handleError(error: Error): void {
      this.logger.add(error);
  }

  
}
