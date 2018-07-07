import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdocumentmanagementComponent } from './subdocumentmanagement.component';

describe('SubdocumentmanagementComponent', () => {
  let component: SubdocumentmanagementComponent;
  let fixture: ComponentFixture<SubdocumentmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdocumentmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdocumentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
