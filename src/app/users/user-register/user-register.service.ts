import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface RegisterResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string
}

@Injectable({ providedIn: "root" })
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post<RegisterResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbwkUb-f5aOaG9kSryXxlZN9fFDZ2_aus",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
