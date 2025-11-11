import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export interface AuthUser {
  id: string;
  nom: string;
  prenom: string;
  login: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  nom: string;
  prenom: string;
  login: string;
  pass: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly baseUrl = `${environment.apiUrl}/utilisateur`;

  private readonly currentUserState = signal<AuthUser | null>(null);
  private readonly loadingState = signal(false);
  private readonly errorState = signal<string | null>(null);

  readonly currentUser = computed(() => this.currentUserState());
  readonly isLoading = computed(() => this.loadingState());
  readonly error = computed(() => this.errorState());
  readonly isAuthenticated = computed(() => this.currentUserState() !== null);

  constructor() {
    // Charger l'utilisateur depuis le localStorage au démarrage
    this.loadUserFromStorage();
  }

  login(payload: LoginPayload) {
    this.loadingState.set(true);
    this.errorState.set(null);

    return this.http.post<AuthUser>(`${this.baseUrl}/login`, payload).pipe(
      tap((user) => {
        this.currentUserState.set(user);
        this.saveUserToStorage(user);
      }),
      catchError((error) => {
        this.errorState.set('Login ou mot de passe incorrect.');
        return throwError(() => error);
      }),
      finalize(() => this.loadingState.set(false))
    );
  }

  register(payload: RegisterPayload) {
    this.loadingState.set(true);
    this.errorState.set(null);

    return this.http.post<AuthUser>(`${environment.apiUrl}/users`, payload).pipe(
      tap((user) => {
        this.currentUserState.set(user);
        this.saveUserToStorage(user);
      }),
      catchError((error) => {
        this.errorState.set("Impossible de créer le compte. Le login existe peut-être déjà.");
        return throwError(() => error);
      }),
      finalize(() => this.loadingState.set(false))
    );
  }

  logout() {
    this.currentUserState.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  private saveUserToStorage(user: AuthUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private loadUserFromStorage() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserState.set(user);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }
}
