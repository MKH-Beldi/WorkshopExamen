import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;
  passwordConfirm: string;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signIn(this.email, this.password).then(
      () => {
        this.router.navigate(['/courses']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
