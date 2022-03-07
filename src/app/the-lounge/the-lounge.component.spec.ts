import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheLoungeComponent } from './the-lounge.component';

describe('TheLoungeComponent', () => {
  let component: TheLoungeComponent;
  let fixture: ComponentFixture<TheLoungeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheLoungeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheLoungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
