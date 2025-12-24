import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskItemType } from '../../shared/types/task-item.type';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  imports: [RouterLink, NgClass, FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  @Input() item!: TaskItemType;

  @Output() deleteItem = new EventEmitter<number>();

  handleDeleteItem = (id: number) => {
    console.log('id', id);
    this.deleteItem.emit(id);
  };
}
