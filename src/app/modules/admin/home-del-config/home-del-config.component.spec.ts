import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDelConfigComponent } from './home-del-config.component';

describe('HomeDelConfigComponent', () => {
  let component: HomeDelConfigComponent;
  let fixture: ComponentFixture<HomeDelConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDelConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDelConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
