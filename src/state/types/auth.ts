export interface AuthResponse {
  message: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface DecodedToken {
  id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}


