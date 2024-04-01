import { createContext } from 'react';
import { ContactsProps } from './ChatProvider';

interface ChatContextProps {
  contacts: ContactsProps[];
  currentUserId: string | undefined;
  sendWebSocketMessage: (message: unknown) => void; // Function to send message
  selectedContact: string | null;
  setSelectedContact: (id: string | null) => void;
  sendMessage: (recipientId: string, content: string) => void;
}

export const ChatContext = createContext<ChatContextProps | undefined>(undefined);
