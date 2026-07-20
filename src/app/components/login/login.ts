import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  mensajeError = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', Validators.required]
  });

  iniciarSesion(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } =
      this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: (respuesta) => {

        this.mensajeError = '';

        console.log(
          'Usuario autenticado:',
          respuesta.usuario
        );

        this.router.navigate(['/cursos']);
      },
      error: (error) => {

        console.error(
          'Error al iniciar sesión:',
          error
        );

        this.mensajeError =
          error.error?.mensaje ||
          'No se pudo iniciar sesión';
      }
    });
  }
}