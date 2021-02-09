import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatemailComponent } from './validatemail.component';

describe('ValidatemailComponent', () => {
  let component: ValidatemailComponent;
  let fixture: ComponentFixture<ValidatemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
