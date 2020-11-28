import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private subscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.user
    .subscribe(user => {
      this.isAuth = !user ? false : true;
    })
  }

  onLogout(){
    this.userService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
