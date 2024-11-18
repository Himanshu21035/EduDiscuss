import { Component, OnChanges, OnInit,SimpleChanges } from '@angular/core';
// import { AuthService } from '../auth.service'; // Import your authentication service
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { User } from '../user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnChanges {
  username: string='User123';
  firstName:string='';
  lastName:string='';
  user:any; 
  logi=0;
  logo=0;
  constructor(
    private afAuth: AngularFireAuth,  // To access Firebase Authentication
    private firestore: AngularFirestore,
    private authService:AuthService,
    private router:Router
  ){

  }
  ngOnChanges(changes: SimpleChanges): void {
    // if(this.user){
    //   this.logi=1;
    //   this.logo=0;
    // }
    // if(!this.user){
    //   this.logo=1;
    //   this.logi=0;
    // }
    
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // this.userId = user.uid;  // Store the user's UID
        // Now, fetch the user details from Firestore using the UID
        this.firestore.collection('users').doc(user.uid).get().subscribe(userDoc => {
          if (userDoc.exists) {
            const userData = userDoc.data() as User;  // Type the data to match the User interface
            this.firstName = userData.firstName;  // Get first name
            this.lastName = userData.lastName;  // Get last name
          }
        });
      }
    });
    this.authService.getUser().subscribe(user => {
      this.user = user; // Will be null if not logged in
    });
    // if(this.user){
    //   this.logi=1;
    //   this.logo=0;
    // }
    // if(!this.user){
    //   this.logo=1;
    //   this.logi=0;
    // }
    
  }
  // constructor(private authService: AuthService, private router: Router) {
  //   this.username = this.authService.getUsername(); // Replace with your method to get the username
  // }

  logout() {
    this.authService.logout();
    // this.authService.logout(); // Implement this in your auth service
    // this.router.navigate(['/login']); // Redirect to login or home page
  }
  login(){
    this.router.navigate(['/login']);
  }
}
