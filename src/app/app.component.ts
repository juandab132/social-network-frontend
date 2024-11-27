import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_WorkPage';
  constructor(private router: Router) {}
  onRegisterClick() {
    this.router.navigate(['/registro']);
  }
  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
