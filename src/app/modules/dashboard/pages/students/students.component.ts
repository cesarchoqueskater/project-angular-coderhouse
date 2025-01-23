import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  studentForm: FormGroup;

  students: Student[] = [
    {
      id : generateRandomString(6),
      name : 'Cesar',
      lastName: 'Choquehuanca',
    }
  ];

  
  displayedColumns: string[] = ['id', 'name', 'lastName','actions'];
  dataSource = [];

  constructor( private fb: FormBuilder ){
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    })
  }

  onSubmit(){
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    }else{
      console.log(this.studentForm.value);

      this.students = [
        ...this.students,
        {
          id : generateRandomString(6),
          ...this.studentForm.value
        }
      ];

      this.studentForm.reset();
      /*
      this.students.push({
        id : generateRandomString(6),
        ...this.studentForm.value
      })
        */
    }
  }

  onDelete( id: string ){
    if (confirm('Estas seguro?')){
      this.students = this.students.filter( (el) => el.id != id );
    }
  }

}
