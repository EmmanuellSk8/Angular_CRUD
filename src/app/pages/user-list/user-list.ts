import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent {

constructor(private router: Router) {}

goToForm() {
  this.router.navigateByUrl('/users/form');
}
}
