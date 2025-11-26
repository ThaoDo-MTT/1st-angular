import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UppercasePipe } from '../pipes/uppercase-pipe';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-body-todo',
  standalone: true,
  imports: [FormsModule, UppercasePipe, NgFor, NgClass, RouterLink],
  templateUrl: './body-todo.html',
  styleUrl: './body-todo.css',
})
export class BodyTodo {
  // Property
  isDisable = false;
  // listTodo: string[] = ['TASK 1', 'TASK 2', 'TASK 3'];

  listTodo: {
    id: number;
    task: string;
    isComplete: boolean;
  }[] = [
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

  handleDelItem(id: number) {
    this.listTodo = this.listTodo.filter((item) => item.id !== id);
  }
}
