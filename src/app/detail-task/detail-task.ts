import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-task',
  imports: [],
  templateUrl: './detail-task.html',
  styleUrl: './detail-task.css',
})
export class DetailTask {
  id: string;

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }
}
