import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UppercasePipe } from '../pipes/uppercase-pipe';
import { NgClass, NgFor } from '@angular/common';
import { TaskItemType } from '../types/task-item.type';
import { TaskItem } from '../../app/task-item/task-item';

@Component({
  selector: 'app-body-todo',
  standalone: true,
  imports: [FormsModule, UppercasePipe, NgFor, TaskItem],
  templateUrl: './body-todo.html',
  styleUrl: './body-todo.css',
})
export class BodyTodo implements OnInit, DoCheck, OnChanges, OnDestroy {
  // Property
  isDisable = false;

  listTodo: TaskItemType[] = [
    {
      id: 1,
      task: 'TASK 1',
      isComplete: true,
    },
    {
      id: 2,
      task: 'TASK 2',
      isComplete: false,
    },
    {
      id: 3,
      task: 'TASK 3',
      isComplete: false,
    },
  ];

  //Attribute
  clearBtn = 'Clear';
  titleBtn = 'Add Todo';
  clickMsg = '';
  bindingText = '';
  constructor() {
    console.log('RUN constructor');
  }

  get totalCompletedTasks() {
    return this.listTodo.filter((item) => item.isComplete).length;
  }

  handleClearText() {
    this.bindingText = '';
  }

  handleAddText() {
    this.listTodo.push({
      id: this.listTodo.length + 1,
      task: this.bindingText,
      isComplete: false,
    });
    this.handleClearText();
  }

  handleDelItem = (id: number) => {
    this.listTodo = this.listTodo.filter((item) => item.id !== id);
  };

  ngOnInit(): void {
    console.log('RUN ngOnInit');

    // fetch('https://dummyjson.com/todos')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const { todos } = data;
    //     console.log('todos', todos.length);

    //     this.listTodo = todos.slice(0, 10).map((item: any) => ({
    //       id: item.id,
    //       task: item.todo,
    //       isComplete: item.completed,
    //     }));

    //     console.log('populated listTodo', this.listTodo);
    //   })
    //   .catch((err) => console.log(err));
  }

  ngDoCheck(): void {
    console.log('RUN ngDoCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('RUN ngOnChanges pre', changes['listTodo'].previousValue);
    console.log('RUN ngOnChanges cur', changes['listTodo'].currentValue);
  }

  ngOnDestroy(): void {
    console.log('RUN ngOnDestroy');
  }
}
