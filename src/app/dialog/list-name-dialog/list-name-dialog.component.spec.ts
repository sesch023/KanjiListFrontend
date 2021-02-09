import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNameDialogComponent } from './list-name-dialog.component';

describe('ListNameDialogComponent', () => {
  let component: ListNameDialogComponent;
  let fixture: ComponentFixture<ListNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
