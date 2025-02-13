import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassStudentsRoutingModule } from './class-students-routing.module';
import { ClassStudentsComponent } from './class-students.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ClassStudentsFormDialogComponent } from './components/class-students-form-dialog/class-students-form-dialog.component';
import { ClassStudentsTableComponent } from './components/class-students-table/class-students-table.component';



@NgModule({
  declarations: [
    ClassStudentsComponent, 
    ClassStudentsFormDialogComponent, 
    ClassStudentsTableComponent],
  imports: [
    CommonModule,
    ClassStudentsRoutingModule,
    SharedModule
  ]
})
export class ClassStudentsModule { }
