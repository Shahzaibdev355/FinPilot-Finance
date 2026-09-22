import { useMutation } from '@tanstack/react-query';

import { sendChatMessage } from '../api/chat.api';

export function useChat() {
  return useMutation({
    mutationFn: sendChatMessage,
  });
}