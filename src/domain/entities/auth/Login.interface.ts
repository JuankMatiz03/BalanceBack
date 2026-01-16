//interface para request del login
export interface ILoginRequest {
  email: string;
  password: string;
}

//interface para la respuesta del login
export interface ILoginResponse {
  authenticated: boolean;
}