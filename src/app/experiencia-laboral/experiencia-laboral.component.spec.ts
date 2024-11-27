import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarExperienciaLaboralComponent } from './experiencia-laboral.component';

describe('RegistrarExperienciaLaboralComponent', () => {
  let component: RegistrarExperienciaLaboralComponent;
  let fixture: ComponentFixture<RegistrarExperienciaLaboralComponent>;
  let httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>(['navigate']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RegistrarExperienciaLaboralComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '2' } } // Mock del parámetro 'id'
          }
        },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarExperienciaLaboralComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges(); // Disparar el ciclo de detección de cambios
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no hay peticiones pendientes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const experienciaForm = component.experienciaForm;
    expect(experienciaForm).toBeTruthy();
    expect(experienciaForm.value).toEqual({
      empresa: '',
      puesto: '',
      fecha_inicio: '',
      fecha_fin: '',
      descripcion: ''
    });
  });

  it('should get the userId from the route', () => {
    expect(component.userId).toBe('2'); // El ID debe coincidir con el mock
  });

  it('should mark the form as invalid if required fields are missing', () => {
    component.experienciaForm.patchValue({
      empresa: '',
      puesto: '',
      fecha_inicio: ''
    });

    expect(component.experienciaForm.valid).toBeFalse();
  });




  it('should show an alert if form is invalid on submit', () => {
    spyOn(window, 'alert'); // Espiar el método `alert`
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Por favor complete todos los campos requeridos.');
  });
});
