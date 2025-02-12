
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teachers } from '../../models';

@Component({
  selector: 'app-teachers-table',
  standalone: false,
  
  templateUrl: './teachers-table.component.html',
  styleUrl: './teachers-table.component.css'
})
export class TeachersTableComponent {
@Input()
  dataSource: Teachers[] = [];

  @Output()
  delete = new EventEmitter<string>()

  @Output()
  edit = new EventEmitter<Teachers>()

  displayedColumns = ['id','name','lastName','age','email','course','actions']; 
}
