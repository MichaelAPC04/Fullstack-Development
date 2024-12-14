import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComputersComponent } from './list-computers.component';

describe('ListComputersComponent', () => {
  let component: ListComputersComponent;
  let fixture: ComponentFixture<ListComputersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComputersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
