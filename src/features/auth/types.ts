export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "rejected" | "fulfilled";
  error: string | null;
}

export interface AuthFormErrors {
  email?: string; 
  password?: string
}