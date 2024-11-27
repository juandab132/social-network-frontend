import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Publicacion {
  id: number;
  usuario: number;
  contenido: string;
  imagen: string;
  fecha_creacion: string;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DatePipe],
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  userId: string | null = null;
  baseUrl = 'http://127.0.0.1:8000';  // Añade la URL base

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      if (this.userId) {
        this.getPublicacionesPorUsuario(this.userId);
      }
    });
  }

  getPublicacionesPorUsuario(userId: string): void {
    this.http.get<Publicacion[]>(`${this.baseUrl}/api/publicaciones/feed/${userId}/`)
      .subscribe({
        next: (response: any) => {
          // Modifica las URLs de las imágenes para que sean completas
          this.publicaciones = response.map((pub: Publicacion) => ({
            ...pub,
            imagen: pub.imagen ? `${this.baseUrl}${pub.imagen}` : null
          }));
          console.log('Publicaciones cargadas:', this.publicaciones);
        },
        error: (error) => {
          console.error('Error al cargar publicaciones:', error);
          alert('No se pudieron cargar las publicaciones');
        }
      });
  }





  verPerfil(): void {
    if (this.userId) {
      this.router.navigate([`/usuarios/${this.userId}`]);
    }
  }

  crearPublicacion(): void {
    if (this.userId) {
      this.router.navigate([`/publicaciones/crear/${this.userId}`]);
    }
  }

}
