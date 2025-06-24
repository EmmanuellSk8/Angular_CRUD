import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/user.interface';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent {

  user: User = { name: '', last_name: '', email: '', tel: '' };
  toastMissingVisible = false;
  toastMissingMessage = '';

  constructor(private router: Router, private userService: UserService) { }

  goToList() {
    this.router.navigateByUrl('/users/list');
  }

  showInvalidToast(message: string) {
    this.toastMissingMessage = message;
    this.toastMissingVisible = true;
    setTimeout(() => {
      this.toastMissingVisible = false;
    }, 3000);
  }

  submitForm(form: NgForm): void {
    if (form.invalid) {
      this.showInvalidToast('Por favor completa todos los campos.');
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: '¡Usuario creado con éxito!',
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => this.goToList(), 2000);
      },
      error: (error) => {
        console.error('Error creando usuario:', error);
        this.showInvalidToast('Error al crear usuario.');
      }
    });
  }
}
