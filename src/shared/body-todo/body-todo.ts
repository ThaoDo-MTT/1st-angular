import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UppercasePipe } from '../pipes/uppercase-pipe';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-body-todo',
  standalone: true,
  imports: [FormsModule, UppercasePipe, NgFor, NgClass],
  templateUrl: './body-todo.html',
  styleUrl: './body-todo.css',
})
export class BodyTodo {
  // Property
  isDisable = false;
  listTodo: string[] = ['TASK 1', 'TASK 2', 'TASK 3'];

  //Attribute
  clearBtn = 'Clear';
  titleBtn = 'Add Todo';
  clickMsg = '';
  bindingText = '';

  handleClearText() {
    this.bindingText = '';
  }

  handleAddText() {
    this.listTodo.push(this.bindingText);
    this.handleClearText();
  }
}
