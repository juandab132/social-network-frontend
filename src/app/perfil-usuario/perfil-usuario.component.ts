import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuarios: any;
  experienciaLaboral: any[] = [];
  datosAcademicos: any[] = [];
  userId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.obtenerPerfil();
    this.obtenerExperienciaLaboral();
    this.obtenerDatosAcademicos();
  }

  obtenerPerfil() {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.http.get(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}`).subscribe({
        next: (response: any) => {
          console.log('Perfil cargado:', response);
          this.usuarios = response;
        },
        error: (error) => {
          console.error('Error al cargar el perfil:', error);
          alert('No se pudo cargar el perfil');
        }
      });
    } else {
      this.router.navigate(['/feed']);
    }
  }
  obtenerExperienciaLaboral() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.http.get(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}/experiencia/`).subscribe({
        next: (response: any) => {
          console.log('Experiencia laboral cargada:', response);
          this.experienciaLaboral = response;
        },
        error: (error) => {
          console.error('Error al cargar experiencia laboral:', error);
          alert('No se pudo cargar la experiencia laboral');
        }
      });
    }
  }
  obtenerDatosAcademicos() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.http.get(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}/academicos/`).subscribe({
        next: (response: any) => {
          console.log('Datos academicos cargados:', response);
          this.datosAcademicos = response;
        },
        error: (error) => {
          console.error('Error al cargar datos academicos:', error);
          alert('No se pudo cargar los datos academicos');
        }
      });
    }
  }
  registrarExperiencia() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate([`/experiencias/${userId}`]);
    }
  }
  registrarDatosAcademicos() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate([`/academicos/${userId}`]);
    }
  }
  editarPerfil() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.router.navigate([`/editar-perfil/${userId}`]);
    }
  }
}
