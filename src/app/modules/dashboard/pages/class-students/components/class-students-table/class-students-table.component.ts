import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClassStudents } from '../../models';

@Component({
  selector: 'app-class-students-table',
  standalone: false,
  
  templateUrl: './class-students-table.component.html',
  styleUrl: './class-students-table.component.css'
})
export class ClassStudentsTableComponent {
@Input()
  dataSource: ClassStudents[] = [];

  @Output()
  delete = new EventEmitter<string>()

  @Output()
  edit = new EventEmitter<ClassStudents>()

  displayedColumns = ['id','className','quantity']; 
}
