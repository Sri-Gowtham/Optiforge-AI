import api from '../lib/api';
import { AuthResponse, LoginCredentials, SignupCredentials } from '../types';
import { setToken, setCurrentUser, removeToken } from '../lib/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log("AUTH PAYLOAD:", credentials);
    try {
      const response = await api.post<any>('/auth/login', credentials);
      console.log("AUTH RESPONSE:", response.data);
      
      const token = response.data.data.token;
      const user = response.data.data.user;
      
      if (token) {
        setToken(token);
        setCurrentUser(user);
      }
      
      // Returning the raw response data which matches the AuthResponse structure { success, data }
      return response.data;
    } catch (error: any) {
      console.error("AUTH ERROR:", error.response?.data || error.message);
      throw error;
    }
  },

  async register(credentials: SignupCredentials): Promise<AuthResponse> {
    console.log("AUTH PAYLOAD:", credentials);
    try {
      const response = await api.post<any>('/auth/register', credentials);
      console.log("AUTH RESPONSE:", response.data);
      
      const token = response.data.data.token;
      const user = response.data.data.user;

      if (token) {
        setToken(token);
        setCurrentUser(user);
      }

      // Returning the raw response data which matches the AuthResponse structure { success, data }
      return response.data;
    } catch (error: any) {
      console.error("AUTH ERROR:", error.response?.data || error.message);
      throw error;
    }
  },

  logout(): void {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
};
