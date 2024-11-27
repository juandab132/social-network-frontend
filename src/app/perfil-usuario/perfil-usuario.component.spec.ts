import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PerfilUsuarioComponent } from './perfil-usuario.component';

describe('PerfilUsuarioComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilUsuarioComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
            params: of({ id: '1' }),
            queryParams: of({ query: 'profile' }),
            data: of({ user: { name: 'Test User', age: 20 } }),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to /feed when userId is null', () => {
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue(null);
    const spy = spyOn(component['router'], 'navigate');
    component.obtenerPerfil();
    expect(spy).toHaveBeenCalledWith(['/feed']);
  });
});

