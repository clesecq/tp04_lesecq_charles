export interface User {
  id: string;
  nom: string;
  prenom: string;
  login: string;
}

export type UserPayload = Omit<User, 'id'> & { pass: string };
