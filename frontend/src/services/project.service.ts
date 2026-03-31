import api from '../lib/api';
import { Project } from '../types';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const response = await api.get<{ success: boolean; data: Project[] }>('/projects');
    return response.data.data;
  },

  async getProjectById(id: string): Promise<Project> {
    const response = await api.get<{ success: boolean; data: Project }>(`/projects/${id}`);
    return response.data.data;
  },

  async createProject(data: { name: string; description: string }): Promise<Project> {
    const response = await api.post<{ success: boolean; data: Project }>('/projects', data);
    return response.data.data;
  }
};
