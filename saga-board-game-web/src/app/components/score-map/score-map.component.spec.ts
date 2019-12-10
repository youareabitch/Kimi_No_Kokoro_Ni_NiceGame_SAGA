import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreMapComponent } from './score-map.component';

describe('ScoreMapComponent', () => {
  let component: ScoreMapComponent;
  let fixture: ComponentFixture<ScoreMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
