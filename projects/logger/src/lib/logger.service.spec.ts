import { enableProdMode } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

fdescribe('LoggerService', () => {
  let service: LoggerService;
  const config = {
    timing: 2000,
    format: 'Oopsie! ',
    console: true,
    localStorage: true
  };

  beforeEach(() => {
    enableProdMode();
    
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        {
          provider: 'loggerConfig',
          useValue: config
        }
      ]
    });
    service = new LoggerService({
      timing: 2000,
      format: 'Oopsie! ',
      console: true,
      localStorage: true
    });
  });

  afterEach(() => {
    service.destroy();
  })

  it('should be created???????', fakeAsync(() => {
    expect(service).toBeTruthy();
    
    
  }));

  fit('should emit a formatted message', (done) => {
    const msg = 'test';

    service.errors.subscribe(error => {
      expect(error.message).toBe(`${config.format}${msg}`);

      done();
    });
    
    service.add(new Error(msg));
  });
});
