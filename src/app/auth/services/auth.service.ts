import { inject, Injectable } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { Observable } from "rxjs";

export class ConnectedUser {
  constructor(public id: number, public email: string) {}
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  /**
   * Le flux du user (user / null)
   */
  //user$!
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
  }
}
