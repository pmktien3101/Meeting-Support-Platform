import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmLayout } from './pm-layout';

describe('PmLayout', () => {
  let component: PmLayout;
  let fixture: ComponentFixture<PmLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
