import { Component,OnInit } from '@angular/core';
import { ClassStudentsService } from '../../../../core/services/class-students.service';
import { ClassStudents } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ClassStudentsFormDialogComponent } from './components/class-students-form-dialog/class-students-form-dialog.component';

@Component({
  selector: 'app-class-students',
  standalone: false,
  
  templateUrl: './class-students.component.html',
  styleUrl: './class-students.component.css'
})
export class ClassStudentsComponent implements OnInit{

  isLoading = false;

  dataSource: ClassStudents[] = [];

  constructor( 
    private ClassStudentsService: ClassStudentsService,
    private matDialog: MatDialog
  ) {}

  handleClassStudentsUpdate(data: ClassStudents[]): void{
    this.dataSource = [...data]
  }

  openFormDialog(editingClassStudent?: ClassStudents) : void{

    if ( editingClassStudent ) {
      console.log('Se procede a editar la clase ',editingClassStudent);
    }

    this.matDialog.open(ClassStudentsFormDialogComponent, {data: { editingClassStudent }})
    .afterClosed()
    .subscribe({
      next: (data) => {
        console.log(data)
        if(!!data){
          if(!!editingClassStudent){
            //Update
            this.updateClassStudents(editingClassStudent.id, data)
          }else{
            this.addClassStudents(data)
          }
        }
      }
    })
  }

  updateClassStudents(id: string, data: { classStudentName: string, quantity:number }){
    
    this.isLoading = true;
    this.ClassStudentsService.updateClassStudentById(id, data).subscribe({
      next: (data) => this.handleClassStudentsUpdate(data),
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  
  addClassStudents(data: { classStudentName:string, quantity:number }): void{
    this.isLoading = true;
    this.ClassStudentsService.addClassStudent(data).subscribe({
      next: (data) => this.handleClassStudentsUpdate(data),
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
    this.ClassStudentsService.getClassStudents().subscribe({
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
    if (confirm("Estas seguro de eliminar la clase")){
      this.isLoading = true;
      this.ClassStudentsService.deleteClassStudentById(id).subscribe({
        next: (data) => {
          console.log('Data ha sido actualizada', data);
          this.handleClassStudentsUpdate(data);
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
