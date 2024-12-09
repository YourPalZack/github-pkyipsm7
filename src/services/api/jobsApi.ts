import axios from 'axios';
import { ApiJob } from '../../types/ApiJob';
import { API_CONFIG } from '../../config/api';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'X-RapidAPI-Key': API_CONFIG.apiKey,
    'X-RapidAPI-Host': API_CONFIG.apiHost,
  },
});

export async function fetchCannabisJobs(): Promise<ApiJob[]> {
  try {
    const response = await api.get('/v2/list', {
      params: {
        query: 'Cannabis',
        location: 'United States',
        autoTranslateLocation: false,
        remoteOnly: false,
        employmentTypes: 'fulltime;parttime;intern;contractor',
      },
    });

    return response.data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}