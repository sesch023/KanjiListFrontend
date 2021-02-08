import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicalInfoComponent } from './radical-info.component';

describe('RadicalInfoComponent', () => {
  let component: RadicalInfoComponent;
  let fixture: ComponentFixture<RadicalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadicalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
