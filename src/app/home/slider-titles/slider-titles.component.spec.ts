import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTitlesComponent } from './slider-titles.component';

describe('SliderTitlesComponent', () => {
  let component: SliderTitlesComponent;
  let fixture: ComponentFixture<SliderTitlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
