export interface RegisterData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  phone: string;
  role: string;
  created_at: string;
}