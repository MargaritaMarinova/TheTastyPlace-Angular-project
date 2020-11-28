import { Component, OnInit } from '@angular/core';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'the-tasty-place';

  constructor(private userService: UserService){

  }

  ngOnInit(){
    this.userService.autoLogin();
  }
}
