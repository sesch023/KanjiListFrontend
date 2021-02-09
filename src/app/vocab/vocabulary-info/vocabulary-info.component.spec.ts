import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyInfoComponent } from './vocabulary-info.component';

describe('VocabularyInfoComponent', () => {
  let component: VocabularyInfoComponent;
  let fixture: ComponentFixture<VocabularyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabularyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
