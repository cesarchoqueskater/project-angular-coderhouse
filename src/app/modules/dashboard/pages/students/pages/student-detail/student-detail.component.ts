import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  
  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  studentId: string;

  constructor(private activateRoute: ActivatedRoute){

    this.studentId = this.activateRoute.snapshot.params['id']

  }
}
