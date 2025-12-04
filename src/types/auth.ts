export interface SignUpRequest {
  username: string
  name: string
  email: string
  password: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  username: string
  email: string
}

export interface AuthContext {
  user: AuthResponse | null
  isLoading: boolean  // Add this
  signup: (data: SignUpRequest) => Promise<void>
  login: (data: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}
