import api from '../lib/api';
import { DashboardStats } from '../types';

export const dashboardService = {
  /**
   * Fetch aggregated dashboard statistics for the authenticated user.
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<{ success: boolean; data: DashboardStats }>('/dashboard');
    return response.data.data;
  }
};
