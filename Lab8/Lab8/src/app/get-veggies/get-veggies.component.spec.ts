import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetVeggiesComponent } from './get-veggies.component';

describe('GetVeggiesComponent', () => {
  let component: GetVeggiesComponent;
  let fixture: ComponentFixture<GetVeggiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetVeggiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetVeggiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
