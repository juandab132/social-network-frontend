// experiencia-laboral.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  styleUrls: ['./experiencia-laboral.component.css']
})
export class RegistrarExperienciaLaboralComponent implements OnInit {
  experienciaForm: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.experienciaForm = this.fb.group({
      empresa: ['', Validators.required],
      puesto: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: [''],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID:', this.userId); 
  }

  onSubmit(): void {
    if (this.experienciaForm.valid && this.userId) {
      const experienciaData = {
        ...this.experienciaForm.value,
        perfil_id: this.userId
      };

      this.http.post(`http://127.0.0.1:8000/api/usuarios/experiencia/${this.userId}/crear/`, experienciaData).subscribe({
        next: (response: any) => {
          console.log('Experiencia laboral registrada:', response);
          this.experienciaForm.reset();
          alert('Experiencia laboral registrada correctamente');
          this.router.navigate([`/usuarios/${this.userId}`]);
        },
        error: (error) => {
          console.error('Error al registrar experiencia laboral:', error);
          alert('Hubo un error al registrar la experiencia laboral');
        }
      });
    } else {
      alert('Por favor complete todos los campos requeridos.');
    }
  }
}
