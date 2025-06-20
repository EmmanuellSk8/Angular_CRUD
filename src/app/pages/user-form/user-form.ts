import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent {

  constructor(private router: Router) {}

goToList() {
this.router.navigateByUrl('/users/list');
}
}