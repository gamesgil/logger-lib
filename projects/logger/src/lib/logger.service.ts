import { Inject, Injectable, Optional } from '@angular/core';
import { isDevMode } from '@angular/core';
import { bufferTime, Subscription, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { Config } from './config.model';
import { CustomError } from './error.model';

@Injectable()
export class LoggerService {
  errors: Subject<CustomError> = new Subject();
  private sub!: Subscription;

  constructor(@Optional() @Inject('loggerConfig') private readonly config: Config) {
    this.config = this.config || {};
    
    this.config.timing = config.timing || 5000;
    this.config.format = config.format || 'hello world';
    this.config.console = config.console || true;
    this.config.localStorage = config.localStorage || true;

    this.sub = this.errors
      .pipe(
        bufferTime(this.config.timing),
        tap(() => this.flush()),
        tap((errors) => this.emitErrors(errors))
      )
      .subscribe();
  }

  add(err: Error) {
    if (isDevMode()) return;

    this.errors.next(this.formatError(err));
  }

  destroy() {
    if (isDevMode()) return;

    this.sub.unsubscribe();
  }

  private flush() {
    localStorage.setItem('errors', JSON.stringify([]));
  }

  private formatError(err: Error): CustomError {
    const error: CustomError = {
      message: `${this.config.format}${err.message}`,
      stack: err.stack || '',
      time: new Date(),
    };

    return error;
  }

  private emitErrors(errors: CustomError[]) {
    if (this.config.console) {
      console.log(errors);
    }

    if (this.config.localStorage) {
      localStorage.setItem('errors', JSON.stringify(errors));
    }
  }
}
