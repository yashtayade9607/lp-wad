import { Component } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html'
})
export class ProfileComponent {

  user: any;

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
  }
}