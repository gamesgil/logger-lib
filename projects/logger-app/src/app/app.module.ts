import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule } from 'logger';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoggerModule.forRoot({
      timing: 1000,
      console: true,
      localStorage: true,
      format: ''
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
