import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UppercasePipe } from '../pipes/uppercase-pipe';
import { NgFor } from '@angular/common';
import { TaskItemType } from '../types/task-item.type';
import { TaskItem } from '../../app/task-item/task-item';

@Component({
  selector: 'app-body-todo',
  standalone: true,
  imports: [FormsModule, UppercasePipe, NgFor, TaskItem],
  templateUrl: './body-todo.html',
  styleUrl: './body-todo.css',
})
export class BodyTodo {
  // Property
  isDisable = false;
  // listTodo: string[] = ['TASK 1', 'TASK 2', 'TASK 3'];

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
}
