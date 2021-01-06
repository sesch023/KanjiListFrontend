import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiCardListInfoComponent } from './kanji-card-list-info.component';

describe('KanjiCardListInfoComponent', () => {
  let component: KanjiCardListInfoComponent;
  let fixture: ComponentFixture<KanjiCardListInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiCardListInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiCardListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
