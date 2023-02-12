import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { LoggerService } from './logger.service';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorHandlerServiceService } from './error-handler-service.service';
import { Config } from './config.model';

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, HttpClientModule],
  providers: [
    LoggerService,
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerServiceService,
      multi: false,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
    // TODO: change to config object (forRoot/forChild)
    
  ],
})
export class LoggerModule {
  static forRoot(config: Config): ModuleWithProviders<LoggerModule> {
    return { ngModule: LoggerModule, providers: [{
      provide: 'loggerConfig',
      useValue: config
    }] };
  }
}
