import { Component } from '@angular/core';
// import { AuthService } from '../auth.service'; // Import your authentication service
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  username: string='User123';

  // constructor(private authService: AuthService, private router: Router) {
  //   this.username = this.authService.getUsername(); // Replace with your method to get the username
  // }

  logout() {
    // this.authService.logout(); // Implement this in your auth service
    // this.router.navigate(['/login']); // Redirect to login or home page
  }
}
