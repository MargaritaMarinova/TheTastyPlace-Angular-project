import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-register",
  templateUrl: "./user-register.component.html",
  styleUrls: ["./user-register.component.css"],
})
export class UserRegisterComponent {
  isLoading = false;
  error: string = null;

  constructor(private userService: UserService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    this.userService.register(email, password).subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;

        this.isLoading = false;
      }
    );
    form.reset();
  }
}
