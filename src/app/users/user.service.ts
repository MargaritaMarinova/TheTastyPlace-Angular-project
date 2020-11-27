import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface UserResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post<UserResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbwkUb-f5aOaG9kSryXxlZN9fFDZ2_aus",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string) {
    return this.http.post<UserResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbwkUb-f5aOaG9kSryXxlZN9fFDZ2_aus",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
