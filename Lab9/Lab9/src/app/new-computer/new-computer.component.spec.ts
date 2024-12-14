import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputerComponent } from './new-computer.component';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewComputerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
