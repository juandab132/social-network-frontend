import { CrearPublicacionComponent } from './crear-publicacion/crear-publicacion.component';
import { RegistrarDatosAcademicosComponent } from './datos-academicos/datos-academicos.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { RegistrarExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RegisterComponent } from './register/register.component';

export const routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed/:userId', component: FeedComponent },
  { path: 'publicaciones/crear/:id', component: CrearPublicacionComponent },
  { path: 'usuarios/:id', component: PerfilUsuarioComponent },
  { path: 'editar-perfil/:id', component: EditarPerfilComponent },
  { path: 'experiencias/:id', component: RegistrarExperienciaLaboralComponent },
  { path: 'academicos/:id', component: RegistrarDatosAcademicosComponent },
  { path: '**', redirectTo: '' }
];
