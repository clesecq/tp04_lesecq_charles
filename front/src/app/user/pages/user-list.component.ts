import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  template: `
    <div class="container">
      <div class="header">
        <h2>Liste des utilisateurs</h2>
        <button class="btn-add" routerLink="/users/create">
          + Ajouter un utilisateur
        </button>
      </div>

      @if (userService.isLoading()) {
        <div class="loading">Chargement des utilisateurs...</div>
      }

      @if (userService.error()) {
        <div class="error-message">
          {{ userService.error() }}
        </div>
      }

      @if (!userService.isLoading() && userService.users().length === 0) {
        <div class="empty-state">
          <p>Aucun utilisateur trouvé</p>
          <button class="btn-primary" routerLink="/users/create">
            Créer le premier utilisateur
          </button>
        </div>
      }

      @if (userService.users().length > 0) {
        <div class="user-grid">
          @for (user of userService.users(); track user.id) {
            <div class="user-card">
              <div class="user-info">
                <h3>{{ user.prenom }} {{ user.nom }}</h3>
                <p class="user-login">
                  <span class="label">Login:</span> {{ user.login }}
                </p>
                <p class="user-id">
                  <span class="label">ID:</span> {{ user.id }}
                </p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h2 {
      color: #333;
      margin: 0;
    }

    .btn-add {
      background-color: #4CAF50;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
    }

    .btn-add:hover {
      background-color: #45a049;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
      font-size: 1.1rem;
    }

    .error-message {
      background-color: #fee;
      color: #c33;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #666;
    }

    .empty-state p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .btn-primary {
      background-color: #4CAF50;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary:hover {
      background-color: #45a049;
    }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .user-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      transition: box-shadow 0.2s;
    }

    .user-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .user-info h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.25rem;
    }

    .user-info p {
      margin: 0.5rem 0;
      color: #666;
    }

    .label {
      font-weight: 600;
      color: #333;
    }

    .user-login {
      font-size: 0.95rem;
    }

    .user-id {
      font-size: 0.85rem;
      color: #999;
      font-family: monospace;
    }
  `]
})
export class UserListComponent implements OnInit {
  private readonly router = inject(Router);
  readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.refresh().subscribe();
  }
}
