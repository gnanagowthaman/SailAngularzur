import { TestBed, inject } from '@angular/core/testing';

import { SubdocumentmanagementService } from './subdocumentmanagement.service';

describe('SubdocumentmanagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubdocumentmanagementService]
    });
  });

  it('should be created', inject([SubdocumentmanagementService], (service: SubdocumentmanagementService) => {
    expect(service).toBeTruthy();
  }));
});
