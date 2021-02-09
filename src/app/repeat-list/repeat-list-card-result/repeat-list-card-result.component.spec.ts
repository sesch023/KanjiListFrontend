import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatListCardResultComponent } from './repeat-list-card-result.component';

describe('RepeatListCardResultComponent', () => {
  let component: RepeatListCardResultComponent;
  let fixture: ComponentFixture<RepeatListCardResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatListCardResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatListCardResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
