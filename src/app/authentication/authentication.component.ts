import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(formData) {
    console.log(formData);
    this.authService.login(formData)
                    .subscribe(
                      data => this.handleLoginSuccess(data),
                      error => this.handleLoginFailure(error)
                    );

  }
  handleLoginSuccess(data) {
    console.log('success: ' + data);
  }

  handleLoginFailure(error) {
    console.log('error: ' + error);
  }

}
