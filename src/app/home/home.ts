import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { BodyTodo } from '../../shared/body-todo/body-todo';

@Component({
  selector: 'app-home',
  imports: [BodyTodo, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  title = 'home-page';
  isServerRunning = true;

  handleToggleServer() {
    this.isServerRunning = !this.isServerRunning;
  }
}
