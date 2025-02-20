export interface User {
  id: number;
  email: string;
  token: string;
}

export interface AuthForm {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
