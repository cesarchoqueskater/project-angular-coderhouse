import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../core/services/teachers.service';
import { Teachers } from './models';
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormDialogComponent } from './components/teacher-form-dialog/teacher-form-dialog.component';

@Component({
  selector: 'app-teachers',
  standalone: false,
  
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit{

  isLoading = false;

  dataSource: Teachers[] = [];

  constructor( 
    private TeacherService: TeacherService,
    private matDialog: MatDialog
  ) {}

  handleTeacherUpdate(data: Teachers[]): void{
    this.dataSource = [...data]
  }

  openFormDialog(editingTeacher?: Teachers) : void{

    if ( editingTeacher ) {
      console.log('Se procede a editar el teacher ',editingTeacher);
    }

    this.matDialog.open(TeacherFormDialogComponent, {data: { editingTeacher }})
    .afterClosed()
    .subscribe({
      next: (data) => {
        console.log(data)
        if(!!data){
          if(!!editingTeacher){
            //Update
            this.updateTeacher(editingTeacher.id, data)
          }else{
            this.addTeacher(data)
          }
        }
      }
    })
  }

  updateTeacher(id: string, data: { name:string, lastName:string, age:string, email:string, course:string }){
    this.isLoading = true;
    this.TeacherService.updateTeacherById(id, data).subscribe({
      next: (data) => this.handleTeacherUpdate(data),
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  /*
  id: string;
  name: string;
  lastName: string;
  age: string;
  email: string;
  course: string;
  */

  addTeacher(data: { name:string, lastName:string, age:string, email:string, course:string }): void{
    this.isLoading = true;
    this.TeacherService.addTeacher(data).subscribe({
      next: (data) => this.handleTeacherUpdate(data),
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false
      }
    }
  )
  }


  ngOnInit(): void {

    this.isLoading = true;
    this.TeacherService.getTeachers().subscribe({
    next: (data) => {
      this.dataSource = [...data];
    },
    error: () => {
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false
    }
   })
  }


  onDelete(id: string) : void{
    if (confirm("Estas seguro de eliminar el profesor")){
      this.isLoading = true;
      this.TeacherService.deleteTeacherById(id).subscribe({
        next: (data) => {
          console.log('Data ha sido actualizada', data);
          this.handleTeacherUpdate(data);
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false
        }
      })
    } 
  }

}
