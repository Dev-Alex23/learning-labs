import { createContext } from 'react';
import { State, StateAction } from './ChatTypes';

interface ChatContextProps {
  state: State;
  dispatch: React.Dispatch<StateAction>;
  currentUser: string | null | undefined;
  sendWebSocketMessage: (message: string) => void;
  selectedContact: string | null;
  setSelectedContact: (id: string | null) => void;
  sendMessage: (recipientId: string, content: string) => void;
}

export const ChatContext = createContext<ChatContextProps | undefined>(undefined);
