interface SignUpRequest {
  username: string
  name: string
  email: string
  password: string
}

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  username: string
  token: string
}

export interface AuthContext {
  user: string | null
  token: string | null
  signup: (username: string, token: string) => void
  login: (username: string, token: string, rememberMe: boolean) => void
  logout: () => void
  isAuthenticated: boolean
}
