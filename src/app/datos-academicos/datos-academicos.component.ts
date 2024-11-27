// experiencia-laboral.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './datos-academicos.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  styleUrls: ['./datos-academicos.component.css']
})
export class RegistrarDatosAcademicosComponent implements OnInit {
  academicoForm: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.academicoForm = this.fb.group({
      institucion: ['', Validators.required],
      carrera: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: [''],
      titulo: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) {
      console.error('User ID is missing');
      alert('User ID is missing.');
    }
  }

  onSubmit(): void {
    if (this.academicoForm.valid && this.userId) {
      const academicoData = {
        ...this.academicoForm.value,
        perfil_id: this.userId
      };

      this.http.post(`http://127.0.0.1:8000/api/usuarios/academicos/${this.userId}/crear/`, academicoData).subscribe({
        next: (response: any) => {
          console.log('datos academicos registrados:', response);
          this.academicoForm.reset();
          alert('datos academicos registrados correctamente');
          this.router.navigate([`/usuarios/${this.userId}`]);
        },
        error: (error) => {
          console.error('Error al registrar datos academicos:', error);
          alert('Hubo un error al registrar los datos academicos');
        }
      });
    } else {
      alert('Por favor complete todos los campos requeridos.');
    }
  }
}
