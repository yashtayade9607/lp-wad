import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  loginUser() {
    if (this.auth.login(this.username, this.password)) {
      alert("Login Success");
      this.router.navigate(['/profile']);
    } else {
      alert("Invalid Credentials");
    }
  }
}