import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReapeatListComponent } from './reapeat-list.component';

describe('ReapeatListComponent', () => {
  let component: ReapeatListComponent;
  let fixture: ComponentFixture<ReapeatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReapeatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReapeatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
