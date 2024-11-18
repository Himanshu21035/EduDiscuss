import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  email : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.auth.forgetPassword(this.email);
    this.email = '';
  }

}
