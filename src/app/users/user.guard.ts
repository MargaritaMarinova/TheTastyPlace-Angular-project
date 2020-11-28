import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { map, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.userService.user.pipe(
      take(1),
      map((user) => {
        return user ? true : false;
      })
    );
  }
}
