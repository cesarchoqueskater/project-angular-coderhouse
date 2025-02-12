import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';


@Component({
  selector: 'app-courses',
  standalone: false,
  
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{

  isLoading = false;


  dataSource: Course[] = [];

  constructor( 
    private CourseService: CourseService,
    private matDialog: MatDialog
  ) {}

  handleCourseUpdate(data: Course[]): void{
    this.dataSource = [...data]
  }

  openFormDialog(editingCourse?: Course) : void{

    if ( editingCourse ) {
      console.log('Se procede a editar el course ',editingCourse);
    }

    this.matDialog.open(CourseFormDialogComponent, {data: { editingCourse }})
    .afterClosed()
    .subscribe({
      next: (data) => {
        console.log(data)
        if(!!data){
          if(!!editingCourse){
            //Update
            this.updateCourse(editingCourse.id, data)
          }else{
            this.addCourse(data)
          }
        }
      }
    })
  }

  updateCourse(id: string, data: {name:string}){
    this.isLoading = true;
    this.CourseService.updateCourseById(id, data).subscribe({
      next: (data) => this.handleCourseUpdate(data),
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  addCourse(data: { name:string}): void{
    this.isLoading = true;
    this.CourseService.addCourse(data).subscribe({
      next: (data) => this.handleCourseUpdate(data),
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
    this.CourseService.getCourses().subscribe({
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
    if (confirm("Estas seguro de eliminar el curso")){
      this.isLoading = true;
      this.CourseService.deleteCourseById(id).subscribe({
        next: (data) => {
          console.log('Data ha sido actualizada', data);
          this.handleCourseUpdate(data);
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
