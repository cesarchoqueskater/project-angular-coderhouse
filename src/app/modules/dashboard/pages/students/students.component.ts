import { Component,model } from '@angular/core';
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
      age: 28,
      active: true
    }
  ];

  
  displayedColumns: string[] = ['id', 'lastName', 'age', 'active','actions'];
  dataSource = [];

  constructor( private fb: FormBuilder ){
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required , Validators.max(99)]],
      active: [true]
    })
  }

  get ageValidation() {
    return this.studentForm.get('age');
  }

  getErrorMessage() {
    const field = this.ageValidation;
    if (field?.hasError('max')) {
      return 'El valor de la edad debe ser menor a 99 años';
    }
    return '';
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

  onColorUpdated(){
    console.log("Se actualizo el color de fondo del elemento")
  }

  onFontSize(){
    console.log("Se modifico el tamaño de la fuente")
  }

}
