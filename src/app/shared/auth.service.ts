import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth,private router:Router) { }
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.fireauth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          observer.next(userCredential.user);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  logout(): void {
    this.fireauth.signOut();
    this.router.navigate(['']);
  }

  getUser(): Observable<any> {
    return this.fireauth.authState;
  }
  signup(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.fireauth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          observer.next(userCredential.user);  // Return user information, including uid
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

//   logout(){
//     this.fireauth.signOut().then(()=>{
//       this.router.navigate(['/signin'])
//       localStorage.removeItem('token');
//     },err=>{
//       alert('error occured');
//       this.router.navigate(['/signin']);
//     })
// }
  forgetPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verify-email']);
    },err=>{
      alert("something went wrong")
    })
  }
  sendEmailForVerification(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verfiy-email'])
    })
  }

}
