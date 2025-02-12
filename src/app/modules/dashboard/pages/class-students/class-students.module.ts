import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassStudentsRoutingModule } from './class-students-routing.module';
import { ClassStudentsComponent } from './class-students.component';
import { SharedModule } from '../../../../shared/shared.module';



@NgModule({
  declarations: [ClassStudentsComponent],
  imports: [
    CommonModule,
    ClassStudentsRoutingModule,
    SharedModule
  ]
})
export class ClassStudentsModule { }
