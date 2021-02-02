import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormTopComponent } from './search-form-top.component';

describe('SearchFormTopComponent', () => {
  let component: SearchFormTopComponent;
  let fixture: ComponentFixture<SearchFormTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFormTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
