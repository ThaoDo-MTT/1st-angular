import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { BodyTodo } from '../../shared/body-todo/body-todo';

@Component({
  selector: 'app-home',
  imports: [BodyTodo],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  title = 'home-page';
}
