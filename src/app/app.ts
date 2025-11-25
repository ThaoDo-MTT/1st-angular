import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../shared/header/header';
import { BodyTodo } from '../shared/body-todo/body-todo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, BodyTodo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo-app');
}
