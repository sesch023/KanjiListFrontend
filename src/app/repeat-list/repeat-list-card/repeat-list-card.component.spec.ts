import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatListCardComponent } from './repeat-list-card.component';

describe('RepeatListCardComponent', () => {
  let component: RepeatListCardComponent;
  let fixture: ComponentFixture<RepeatListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
