import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  id: string;
  username: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post<LoginResponse>('http://127.0.0.1:8000/api/usuarios/login/', this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('Respuesta del login:', response);

            localStorage.setItem('user_id', response.id);
            localStorage.setItem('username', response.username);
            localStorage.setItem('login_time', new Date().toISOString());

            console.log('User ID guardado:', localStorage.getItem('user_id'));

            this.router.navigate([`/feed/${response.id}`]);
          },
          error: (error) => {
            console.error('Error en el login:', error);
            if (error.status === 401) {
              alert('Username o contraseña incorrectos');
            } else {
              alert('Error al iniciar sesión. Por favor, intente nuevamente.');
            }
          }
        });
    }
  }

}
