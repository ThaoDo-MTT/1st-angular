import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { DetailTask } from './detail-task/detail-task';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'detail-task/:id',
    component: DetailTask,
  },
];
