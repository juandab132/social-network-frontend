import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CrearPublicacionComponent } from './crear-publicacion.component';

describe('CrearPublicacionComponent', () => {
  let component: CrearPublicacionComponent;
  let fixture: ComponentFixture<CrearPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPublicacionComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }), // Mock de parámetros de la URL
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '1' : null) // Simular método get
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate') // Mock del router
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should log an error and not proceed if form is invalid', () => {
    spyOn(console, 'log');

    // Invalidar el formulario
    component.feedForm.setValue({ contenido: '', imagen: null });

    component.crearPublicacion();

    // Verificar que el mensaje de formulario inválido se haya registrado
    expect(console.log).toHaveBeenCalledWith('Formulario inválido', component.feedForm);
  });
});
