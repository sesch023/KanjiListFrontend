import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiCardAddComponent } from './kanji-card-add.component';

describe('KanjiBaseAddComponent', () => {
  let component: KanjiCardAddComponent;
  let fixture: ComponentFixture<KanjiCardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiCardAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
