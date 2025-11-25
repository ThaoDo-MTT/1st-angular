import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTodo } from './body-todo';

describe('BodyTodo', () => {
  let component: BodyTodo;
  let fixture: ComponentFixture<BodyTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyTodo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
