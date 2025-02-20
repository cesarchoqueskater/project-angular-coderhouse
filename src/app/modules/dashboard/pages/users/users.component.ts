import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';


@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (usersPagination) => {
        console.log(usersPagination);
      },
    });
  }
}