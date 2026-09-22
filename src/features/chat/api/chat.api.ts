import { apiClient } from '@/api/axios';

import type {
  ChatRequest,
  ChatResponse,
} from '../types/chat.types';

export async function sendChatMessage(
  payload: ChatRequest,
): Promise<ChatResponse> {
  const response = await apiClient.post<ChatResponse>(
    '/chat',
    payload,
  );

  return response.data;
}