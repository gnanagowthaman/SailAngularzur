import { TestBed, inject } from '@angular/core/testing';

import { DocumentuploadService } from './documentupload.service';

describe('DocumentuploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentuploadService]
    });
  });

  it('should be created', inject([DocumentuploadService], (service: DocumentuploadService) => {
    expect(service).toBeTruthy();
  }));
});
