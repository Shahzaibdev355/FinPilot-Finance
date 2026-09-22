import { toast } from 'sonner';

import { getApiErrorMessage } from '@/api/endpoints';

export function showApiError(error: unknown): void {
  toast.error('FinPilot request failed', {
    description: getApiErrorMessage(error),
  });
}