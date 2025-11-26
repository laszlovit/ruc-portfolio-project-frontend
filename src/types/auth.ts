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
