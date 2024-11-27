import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RegistrarDatosAcademicosComponent } from './datos-academicos.component';

describe('RegistrarDatosAcademicosComponent', () => {
  let component: RegistrarDatosAcademicosComponent;
  let fixture: ComponentFixture<RegistrarDatosAcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarDatosAcademicosComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '2' } }, // Mock de paramMap
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarDatosAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

