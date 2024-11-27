import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-publicacion',
  templateUrl: './crear-publicacion.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  styleUrls: ['./crear-publicacion.component.css']
})
export class CrearPublicacionComponent {
  feedForm: FormGroup;

  @Output() publicacionCreada = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.feedForm = this.fb.group({
      contenido: ['', [Validators.required]],
      imagen: [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      console.log('UserId desde la URL:', userId);
    });
  }

  crearPublicacion(): void {
    console.log('Formulario enviado');
    if (this.feedForm.valid) {
      const userId = this.route.snapshot.paramMap.get('id');
      console.log('userId:', userId);
      if (userId) {
        const formData = new FormData();
        formData.append('contenido', this.feedForm.value.contenido);
        if (this.feedForm.value.imagen) {
          formData.append('imagen', this.feedForm.value.imagen);
        }

        // Incluir el userId en la URL de la API
        this.http.post(`http://127.0.0.1:8000/api/publicaciones/publicaciones/crear/${userId}/`, formData)
          .subscribe({
            next: (response: any) => {
              console.log('Respuesta del backend:', response);
              this.publicacionCreada.emit(response);
              this.feedForm.reset();
              // Redirigir al feed después de crear la publicación
              this.router.navigate([`/feed/${userId}`]);
            },
            error: (error) => {
              console.error('Error al crear publicación:', error);
              alert('No se pudo crear la publicación');
            }
          });
      } else {
        console.error('No se encontró el userId en localStorage');
        this.router.navigate(['/login']);
      }
    } else {
      console.log('Formulario inválido', this.feedForm);
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.feedForm.patchValue({
        imagen: file
      });
    }
  }
}
