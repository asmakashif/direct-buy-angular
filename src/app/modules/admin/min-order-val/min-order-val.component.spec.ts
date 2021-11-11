import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinOrderValComponent } from './min-order-val.component';

describe('MinOrderValComponent', () => {
  let component: MinOrderValComponent;
  let fixture: ComponentFixture<MinOrderValComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinOrderValComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinOrderValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
