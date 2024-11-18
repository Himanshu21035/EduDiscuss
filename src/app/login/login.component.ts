// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router to navigate after login
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // This method is called when the user submits the login form
  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (user) => {
        console.log('Login successful:', user);
        // Navigate to the home page after successful login
        this.router.navigate(['/home']); // Or any other route you want to navigate to
      },
      (error) => {
        this.errorMessage = error.message;
        console.error('Login error:', error);
      }
    );
  }
  closeModal(){
    this.router.navigate([''])
  }
}
