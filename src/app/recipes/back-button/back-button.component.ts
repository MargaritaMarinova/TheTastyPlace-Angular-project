import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-back-button",
  templateUrl: "./back-button.component.html",
  styleUrls: ["./back-button.component.css"],
})
export class BackButtonComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
