import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'logger-app';

  constructor(private l: LoggerService) {
    // throw new Error('gil')

  }
  ngOnInit(): void {

  }

  createErorr() {
    throw new Error('gilgilgigl')
    
  }
}
