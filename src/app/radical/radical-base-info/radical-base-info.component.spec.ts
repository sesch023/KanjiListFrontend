import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicalBaseInfoComponent } from './radical-base-info.component';

describe('RadicalBaseInfoComponent', () => {
  let component: RadicalBaseInfoComponent;
  let fixture: ComponentFixture<RadicalBaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadicalBaseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadicalBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
