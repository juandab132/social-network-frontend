import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  perfilForm: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Obtén el ID del usuario desde la URL
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarDatosPerfil();
  }

  cargarDatosPerfil() {
    // Usar el ID para cargar los datos del perfil
    this.http.get(`http://127.0.0.1:8000/api/usuarios/usuarios/${this.userId}/`).subscribe(
      (perfil: any) => {
        this.perfilForm.patchValue({
          nombre: perfil.nombre,
          apellido: perfil.apellido,
          fecha_nacimiento: perfil.fecha_nacimiento,
        });
      },
      error => {
        console.error('Error al cargar los datos del perfil:', error);
        alert('No se pudieron cargar los datos del perfil.');
      }
    );
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      // Hacer la solicitud PUT para actualizar el perfil
      this.http.put(`http://127.0.0.1:8000/api/usuarios/editar-perfil/${this.userId}/`, this.perfilForm.value).subscribe(
        (response: any) => {
          console.log('Perfil actualizado con éxito:', response);
          alert('Perfil actualizado exitosamente.');
          this.router.navigate(['/usuarios', this.userId]);  // Redirigir al perfil
        },
        error => {
          console.error('Error al actualizar el perfil:', error);
          alert('No se pudo actualizar el perfil.');
        }
      );
    }
  }
}