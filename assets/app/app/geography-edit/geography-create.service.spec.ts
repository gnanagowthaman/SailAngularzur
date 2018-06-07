import { TestBed, inject } from '@angular/core/testing';

import { GeographyCreateService } from './geography-create.service';

describe('GeographyCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeographyCreateService]
    });
  });

  it('should be created', inject([GeographyCreateService], (service: GeographyCreateService) => {
    expect(service).toBeTruthy();
  }));
});
