import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.userIsLoggedIn()) {
      this.refreshFlags();
    }
  }

  refreshFlags() {
    this.isAuthenticated = true;
    this.welcomeMessage = 'Bienvenue';
  }

  login(formData) {
    this.authService.login(formData)
                    .subscribe(
                      data => this.handleLoginSuccess(data),
                      error => this.handleLoginFailure(error)
                    );

  }

  handleLoginSuccess(data) {
    this.jbbData = data;
    this.refreshFlags();
    localStorage.setItem('jbb-data', JSON.stringify(this.jbbData));
  }

  handleLoginFailure(error) {
    console.log('error: ' + error);
  }

}
