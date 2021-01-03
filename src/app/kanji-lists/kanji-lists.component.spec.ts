import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiListsComponent } from './kanji-lists.component';

describe('KanjilistlistComponent', () => {
  let component: KanjiListsComponent;
  let fixture: ComponentFixture<KanjiListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
