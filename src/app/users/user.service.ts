import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface UserResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http
      .post<UserResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbwkUb-f5aOaG9kSryXxlZN9fFDZ2_aus",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<UserResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbwkUb-f5aOaG9kSryXxlZN9fFDZ2_aus",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "Възникна неопределена грешка";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Този и-мейл вече съществува";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Невалидна парола";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Този и-мейл не е регистриран";
        break;
    }

    return throwError(errorMessage);
  }
}
