import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographyCreateComponent } from './geography-create.component';

describe('GeographyCreateComponent', () => {
  let component: GeographyCreateComponent;
  let fixture: ComponentFixture<GeographyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
