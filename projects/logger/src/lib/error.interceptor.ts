import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private readonly logger: LoggerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    
                    this.logger.add(new Error(errorMsg));

                    return throwError(errorMsg);
                })
            );
    }
}