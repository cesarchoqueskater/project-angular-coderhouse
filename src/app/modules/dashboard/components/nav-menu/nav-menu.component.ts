import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

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
    },
    {
      label: 'Users',
      routerLink: 'users',
    }
  ];

  //constructor( private router: Router){};
  constructor(private authService: AuthService) {}

  logout() : void{
    localStorage.removeItem('token');

    //this.router.navigate(['auth','login']);
    this.authService.logout();
  }
}
