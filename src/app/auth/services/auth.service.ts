import { inject, Injectable } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { BehaviorSubject, map, Observable, Subject, tap } from "rxjs";
import { APP_CONSTANTES } from "../../config/app_const.config";

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
  private userSubject$ = new BehaviorSubject<ConnectedUser | null>(null);
  user$ = this.userSubject$.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user));
  isLoggedOut$: Observable<boolean> = this.user$.pipe(map((user) => !user));
  constructor() {
    const user = localStorage.getItem(APP_CONSTANTES.connectedUser);
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }
  saveToken(token: string) {
    localStorage.setItem(APP_CONSTANTES.token, token);
  }

  getToken(): string {
    return localStorage.getItem(APP_CONSTANTES.token) ?? "";
  }

  removeToken() {
    localStorage.removeItem(APP_CONSTANTES.token);
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response: LoginResponseDto) => {
        this.saveToken(response.id);
        const connectedUser = new ConnectedUser(
          response.userId,
          credentials.email
        );
        this.userSubject$.next(connectedUser);
        localStorage.setItem(
          APP_CONSTANTES.connectedUser,
          JSON.stringify(connectedUser)
        );
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.removeToken();
    localStorage.removeItem(APP_CONSTANTES.connectedUser);
    this.userSubject$.next(null);
  }
}
