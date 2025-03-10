import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassStudents } from '../../models';

interface ClassStudentsFormDialogData{
  editingClassStudent?: ClassStudents;
}

@Component({
  selector: 'app-class-students-form-dialog',
  standalone: false,
  
  templateUrl: './class-students-form-dialog.component.html',
  styleUrl: './class-students-form-dialog.component.css'
})
export class ClassStudentsFormDialogComponent {

  clasStudentForm: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<ClassStudentsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ClassStudentsFormDialogData
    ){
      this.clasStudentForm = this.fb.group({
        classStudentName: ['', Validators.required],
        quantity: ['', Validators.required],
      })
      //console.log("valor 1" ,data);
      //console.log("valor 2" ,data.editingClassStudent);
    if(!!data && !!data.editingClassStudent) {
      //console.log("Entro a patchValue")
      this.clasStudentForm.patchValue(data.editingClassStudent)
    }
  }


  onConfirm(): void{

    if (this.clasStudentForm.invalid){
      this.clasStudentForm.markAllAsTouched()
    }else{
      this.matDialogRef.close(this.clasStudentForm.value)
    }
  }
}
