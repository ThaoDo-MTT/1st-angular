import { Component, Input } from '@angular/core';
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

  @Input() handleDelItem!: (id: number) => void;

  ngOnInit(): void {
    // Kiểm tra nếu handleDelItem là một function
    if (typeof this.handleDelItem !== 'function') {
      console.error('handleDelItem is not a function!');
    }
  }
}
