import { TestBed, inject } from '@angular/core/testing';

import { RegulatorService } from './regulator.service';

describe('RegulatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegulatorService]
    });
  });

  it('should be created', inject([RegulatorService], (service: RegulatorService) => {
    expect(service).toBeTruthy();
  }));
});
