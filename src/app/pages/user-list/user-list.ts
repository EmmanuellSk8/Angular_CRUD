import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { deleteIcon } from '../../icons/delete-icon';
import { editIcon } from '../../icons/edit-icon';
import { User } from '../../interface/user.interface';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  imports: [NgFor, deleteIcon, editIcon, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserListComponent implements OnInit {

  users: User[] = [];
  userToDelete?: User;
  userToUpdate: User = { name: '', last_name: '', email: '', tel: '0' };
  tempUser: User = { id: 0, name: '', last_name: '', email: '', tel: '0' };


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
    event?.preventDefault();

    if (!this.userToDelete?.id) return;

    this.userService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== this.userToDelete?.id);
         Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: '¡Usuario eliminado con éxito!',
          timer: 2000,
          showConfirmButton: false
        });
        this.closeModal();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

  closeUpdateModal() {
    const modal = document.getElementById('updateModal') as HTMLDialogElement;
    modal?.close();
  }

  openUpdateModal(user: User) {
    this.userToUpdate = { ...user };
    const modal = document.getElementById('updateModal') as HTMLDialogElement;
    modal?.showModal();
  }

  updateUser(event?: Event): void {
    event?.preventDefault();

    if (!this.userToUpdate?.id) return;

    const { name, email, last_name, tel } = this.userToUpdate;

    if (!name?.trim() || !email?.trim() || !last_name?.trim() || !tel?.toString().trim()) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    this.userService.updateUser(this.userToUpdate.id, this.userToUpdate).subscribe({
      next: () => {
        const index = this.users.findIndex(user => user.id === this.userToUpdate?.id);
        if (index !== -1) {
          this.users[index] = { ...this.userToUpdate! };
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: '¡Usuario actualizado con éxito!',
            timer: 2000,
            showConfirmButton: false
          });
        }
        this.closeUpdateModal();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }

}