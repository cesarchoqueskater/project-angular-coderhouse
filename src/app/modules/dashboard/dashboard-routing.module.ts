import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClassStudentsModule } from './pages/class-students/class-students.module';


import { authGuard } from '../../core/guards/auth.guards';
import { adminGuard } from '../../core/guards/admin.guard';


const routes: Routes = [

  /**
   * Si la intencion es definir la ruta "/dashboard/home"
   */
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: "students",
    loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  
  {
    path: "courses",
    loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },

  {
    path: "class-students",
    loadChildren: () => import('./pages/class-students/class-students.module').then((m) => m.ClassStudentsModule),
  },

  {
    path: "teachers",
    loadChildren: () => import('./pages/teachers/teachers.module' ).then((m) => m.TeachersModule),
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
