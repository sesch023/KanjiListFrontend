import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiCardsComponent } from './kanji-cards.component';

describe('KanjicardsComponent', () => {
  let component: KanjiCardsComponent;
  let fixture: ComponentFixture<KanjiCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
