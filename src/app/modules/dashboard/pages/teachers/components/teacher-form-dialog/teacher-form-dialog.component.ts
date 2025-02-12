import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teachers } from '../../models';

interface TeachersFormDialogData{
  editingTeacher?: Teachers;
}

@Component({
  selector: 'app-teacher-form-dialog',
  standalone: false,
  
  templateUrl: './teacher-form-dialog.component.html',
  styleUrl: './teacher-form-dialog.component.css'
})
export class TeacherFormDialogComponent {

  teacherForm: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TeacherFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TeachersFormDialogData
    ){
      this.teacherForm = this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', Validators.required],
        email: ['', Validators.required],
        course: ['', Validators.required],
      })

    if(!!data && !!data.editingTeacher) {
      this.teacherForm.patchValue(data.editingTeacher)
    }
  }


  onConfirm(): void{

    if (this.teacherForm.invalid){
      this.teacherForm.markAllAsTouched()
    }else{
      this.matDialogRef.close(this.teacherForm.value)
    }
  }
}

