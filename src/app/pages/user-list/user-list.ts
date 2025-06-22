import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { deleteIcon } from '../../icons/delete-icon';
import { editIcon } from '../../icons/edit-icon';
import { User } from '../../interface/user.interface';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-user-list',
  imports: [NgFor, deleteIcon, editIcon],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserListComponent implements OnInit {

  users: User[] = [];
  userToDelete?: User;


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  };

  goToForm() {
    this.router.navigateByUrl('/users/form');
  }

  closeModal() {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    modal?.close();
  }

  openModal(user: User) {
    this.userToDelete = user;
    const modal = document.getElementById('modal') as HTMLDialogElement;
    modal?.showModal();
  }

confirmDelete(event?: Event): void {
  event?.preventDefault(); // opcional

  if (!this.userToDelete?.id) return;

  this.userService.deleteUser(this.userToDelete.id).subscribe({
    next: () => {
      this.users = this.users.filter(user => user.id !== this.userToDelete?.id);
      this.closeModal();
    },
    error: (error) => {
      console.error('Error deleting user:', error);
    }
  });
}


}
