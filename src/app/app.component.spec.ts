import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; // Importamos RouterTestingModule
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy; // Variable para espiar el método navigate
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent], // Usamos RouterTestingModule y AppComponent importado
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate'); // Espejeamos el método navigate
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to /login when onLoginClick is called', () => {
    component.onLoginClick();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
  it('should navigate to /registro when onRegisterClick is called', () => {
    component.onRegisterClick();
    expect(navigateSpy).toHaveBeenCalledWith(['/registro']);
  });
  it('should have the title Angular_WorkPage', () => {
    expect(component.title).toEqual('Angular_WorkPage');
  });
});
