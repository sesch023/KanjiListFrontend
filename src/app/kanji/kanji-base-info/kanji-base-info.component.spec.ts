import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiBaseInfoComponent } from './kanji-base-info.component';

describe('KanjiBaseInfoComponent', () => {
  let component: KanjiBaseInfoComponent;
  let fixture: ComponentFixture<KanjiBaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiBaseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
