export interface AuthState {
    status: 'Checking' | 'Authenticated' | 'Not-Authenticated';
    token: string;
    role: string;
    errorMessage: string;
}

export interface LoginResponse {
    token: string;
    role: string;
}

export interface LoginData {
    username: string;
    password: string;
}