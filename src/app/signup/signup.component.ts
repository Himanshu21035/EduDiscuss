import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../shared/firestore.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  errorMessage: string = '';
  selectedCourse:string='';
  courses: string[] = ['Computer Engineering', 'Information Technology', 
    'Civil Engineering','', 'Mechanical Engineering'];
  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }
  onSignup() {
    this.authService.signup(this.email, this.password).subscribe(
      (user) => {
        console.log('User signed up:', user);
        // Once the user is signed up, save custom data to Firestore
        this.firestoreService.saveUserData(user.uid, this.firstName, this.lastName, this.selectedCourse);
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        this.errorMessage = error.message;
        console.error('Signup error:', error);
      }
    );
  }
}
