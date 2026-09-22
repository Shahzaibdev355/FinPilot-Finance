import axios from 'axios';

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.detail) {
      return String(error.response.data.detail);
    }

    if (error.response?.status === 429) {
      return 'Market data limit reached. Please try again later.';
    }

    if (error.response?.status === 502) {
      return 'FinPilot AI service is temporarily unavailable.';
    }

    if (error.response?.status && error.response.status >= 500) {
      return 'FinPilot is temporarily unavailable. Please try again.';
    }

    if (error.response?.status === 404) {
      return 'The requested resource was not found.';
    }

    if (error.code === 'ECONNABORTED') {
      return 'The request timed out. Please try again.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}