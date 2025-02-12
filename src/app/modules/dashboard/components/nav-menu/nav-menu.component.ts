import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  
  templateUrl: './nav-menu.component.html',
  styles: ``
})
export class NavMenuComponent {

  linkItems : { label: string; routerLink: string }[] = [
    {
      label: 'Home',
      routerLink: 'home',
    }    
    ,
    {
      label: 'Students',
      routerLink: 'students',
    }    
    ,
    {
      label: 'Class',
      routerLink: 'class-students',
    }    
    ,
    {
      label: 'Course',
      routerLink: 'courses',
    },
    {
      label: 'Teacher',
      routerLink: 'teachers',
    }
  ];

  constructor( private router: Router){
  };

  logout() : void{
    localStorage.removeItem('token');

    this.router.navigate(['auth','login']);
  }
}
