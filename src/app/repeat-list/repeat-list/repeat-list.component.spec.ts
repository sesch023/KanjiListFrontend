import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatListComponent } from './repeat-list.component';

describe('ReapeatListComponent', () => {
  let component: RepeatListComponent;
  let fixture: ComponentFixture<RepeatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
