import api from '../lib/api';
import { Analysis } from '../types';

export const analysisService = {
  /**
   * Run a new analysis for a specific project.
   */
  async runAnalysis(projectId: string): Promise<Analysis> {
    const response = await api.post<{ success: boolean; data: Analysis }>(`/projects/${projectId}/analyses`);
    return response.data.data;
  },

  /**
   * Fetch all analysis results for the user (across all projects).
   */
  async getResults(): Promise<Analysis[]> {
    const response = await api.get<{ success: boolean; data: Analysis[] }>('/results');
    return response.data.data;
  },

  /**
   * Fetch a specific analysis result by ID.
   */
  async getResultById(id: string): Promise<Analysis> {
    const response = await api.get<{ success: boolean; data: Analysis }>(`/results/${id}`);
    return response.data.data;
  }
};
