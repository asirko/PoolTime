import { TestBed, inject } from '@angular/core/testing';

import { TimersService } from './timers.service';

describe('TimersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimersService]
    });
  });

  it('should be created', inject([TimersService], (service: TimersService) => {
    expect(service).toBeTruthy();
  }));
});
