import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-register",
  templateUrl: "./user-register.component.html",
  styleUrls: ["./user-register.component.css"],
})
export class UserRegisterComponent {
  constructor(private userService: UserService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.userService.register(email, password).subscribe((resData) => {
      console.log(resData);
    });
    form.reset();
  }
}
