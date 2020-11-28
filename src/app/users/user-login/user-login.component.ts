import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  isLoading = false;
  error: string = null;

  constructor(private userService: UserService,
    private router : Router) { }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.userService.login(email, password)
    .subscribe((resData) => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    },
    (errorMessage) => {
      console.log(errorMessage);
      this.error = errorMessage;

      this.isLoading = false;
    });
    form.reset();
  }

}
