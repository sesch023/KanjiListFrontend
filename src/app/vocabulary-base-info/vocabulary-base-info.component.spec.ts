import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyBaseInfoComponent } from './vocabulary-base-info.component';

describe('VocabularyBaseInfoComponent', () => {
  let component: VocabularyBaseInfoComponent;
  let fixture: ComponentFixture<VocabularyBaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabularyBaseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
