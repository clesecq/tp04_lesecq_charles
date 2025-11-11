import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserPayload } from '../user.model';

@Component({
  selector: 'app-user-create',
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Ajouter un utilisateur</h2>
      
      @if (userService.error()) {
        <div class="error-message">
          {{ userService.error() }}
        </div>
      }
      
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nom">Nom *</label>
          <input 
            id="nom" 
            type="text" 
            formControlName="nom"
            [class.invalid]="userForm.get('nom')?.invalid && userForm.get('nom')?.touched"
          />
          @if (userForm.get('nom')?.invalid && userForm.get('nom')?.touched) {
            <div class="error">Le nom est requis</div>
          }
        </div>

        <div class="form-group">
          <label for="prenom">Prénom *</label>
          <input 
            id="prenom" 
            type="text" 
            formControlName="prenom"
            [class.invalid]="userForm.get('prenom')?.invalid && userForm.get('prenom')?.touched"
          />
          @if (userForm.get('prenom')?.invalid && userForm.get('prenom')?.touched) {
            <div class="error">Le prénom est requis</div>
          }
        </div>

        <div class="form-group">
          <label for="login">Login *</label>
          <input 
            id="login" 
            type="text" 
            formControlName="login"
            [class.invalid]="userForm.get('login')?.invalid && userForm.get('login')?.touched"
          />
          @if (userForm.get('login')?.invalid && userForm.get('login')?.touched) {
            <div class="error">
              @if (userForm.get('login')?.errors?.['required']) {
                Le login est requis
              }
              @if (userForm.get('login')?.errors?.['pattern']) {
                Le login doit contenir uniquement des lettres et chiffres (max 20 caractères)
              }
            </div>
          }
        </div>

        <div class="form-group">
          <label for="pass">Mot de passe *</label>
          <input 
            id="pass" 
            type="password" 
            formControlName="pass"
            [class.invalid]="userForm.get('pass')?.invalid && userForm.get('pass')?.touched"
          />
          @if (userForm.get('pass')?.invalid && userForm.get('pass')?.touched) {
            <div class="error">
              @if (userForm.get('pass')?.errors?.['required']) {
                Le mot de passe est requis
              }
              @if (userForm.get('pass')?.errors?.['minlength']) {
                Le mot de passe doit contenir au moins 4 caractères
              }
              @if (userForm.get('pass')?.errors?.['pattern']) {
                Le mot de passe doit contenir uniquement des lettres et chiffres
              }
            </div>
          }
        </div>

        <div class="form-actions">
          <button 
            type="submit" 
            [disabled]="userForm.invalid || userService.isLoading()"
            class="btn-primary"
          >
            @if (userService.isLoading()) {
              Création en cours...
            } @else {
              Créer l'utilisateur
            }
          </button>
          
          <button 
            type="button" 
            (click)="onCancel()"
            class="btn-secondary"
            [disabled]="userService.isLoading()"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
    }

    h2 {
      margin-bottom: 2rem;
      color: #333;
    }

    .error-message {
      background-color: #fee;
      color: #c33;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #4CAF50;
    }

    input.invalid {
      border-color: #c33;
    }

    .error {
      color: #c33;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #4CAF50;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #45a049;
    }

    .btn-secondary {
      background-color: #f5f5f5;
      color: #333;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #e0e0e0;
    }
  `]
})
export class UserCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly userService = inject(UserService);

  readonly userForm = this.fb.nonNullable.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    login: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{1,20}$/)]],
    pass: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Za-z0-9]+$/)]]
  });

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const payload: UserPayload = this.userForm.getRawValue();
    
    this.userService.create(payload).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
