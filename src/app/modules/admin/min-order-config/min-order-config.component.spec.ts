import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinOrderConfigComponent } from './min-order-config.component';

describe('MinOrderConfigComponent', () => {
  let component: MinOrderConfigComponent;
  let fixture: ComponentFixture<MinOrderConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinOrderConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinOrderConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
