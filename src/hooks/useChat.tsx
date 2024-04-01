import { ChatContext } from '@context/ChatContext';
import { useContext } from 'react';

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used inside of a ChatProviders');
  }

  return context;
};