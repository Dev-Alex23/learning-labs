import useChatWebSocket from '@hooks/useWebsocket';
import { FC, ReactNode, useCallback, useReducer, useState } from 'react';
import { ChatContext } from './ChatContext';

interface ChatProviderProps {
  children: ReactNode;
  currentUserId: string | undefined;
}

enum MessageType {
  REGISTER = 'register',
  PRIVATE_MESSAGE = 'private_message',
  ADD_USER = 'add_user',
}

interface ContactMessage {
  type: MessageType;
  senderId: string;
  recipientId: string;
  userId?: string;
  content: string;
  timeStamp: string;
}

export interface ContactsProps {
  contactId: string;
  messages: ContactMessage[];
}

type Action =
  | { type: 'ADD_OR_UPDATE_CONTACT'; payload: ContactMessage }
  | { type: 'ADD_USER'; payload: ContactMessage };

const chatStateReducer = (state: ContactsProps[], { type, payload }: Action) => {
  switch (type) {
    case 'ADD_OR_UPDATE_CONTACT': {
      const { senderId, recipientId } = payload;
      console.log({ payload });

      // check if this user in contacts
      const isContact = state.some((contact) => contact.contactId === (recipientId || senderId));
      console.log({ isContact });

      if (!isContact) {
        console.log({ contactId: senderId, messages: [payload] });

        return [...state, { contactId: senderId, messages: [payload] }];
      }

      return state.map((contact) => {
        if (contact.contactId === senderId || contact.contactId === recipientId) {
          console.log({ ...contact, messages: [...contact.messages, payload] });

          return { ...contact, messages: [...contact.messages, payload] };
        }
        return contact;
      });
    }
    case 'ADD_USER': {
      console.log(state[1]?.contactId);

      const isContact = state.some((contact) => contact.contactId === (payload.recipientId || payload.userId));

      if (isContact) return state;
      console.log(isContact);

      return [...state, { contactId: payload.recipientId, messages: [] }];
    }
    default:
      return state;
  }
};

export const ChatProvider: FC<ChatProviderProps> = ({ children, currentUserId }) => {
  const [contacts, dispatch] = useReducer(chatStateReducer, []);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const message: ContactMessage = JSON.parse(event.data);

    switch (message.type) {
      case MessageType.PRIVATE_MESSAGE:
        dispatch({ type: 'ADD_OR_UPDATE_CONTACT', payload: message });
        break;

      case MessageType.ADD_USER: {
        console.log('Adding a new user:', message);
        dispatch({ type: 'ADD_USER', payload: message });
        break;
      }

      default:
        console.log('Unhandled message type:', message);
        break;
    }
  }, []);

  const handleClose = () => {
    console.error('WebSocket close');
  };

  const socket = {
    onMessage: handleMessage,
    onClose: handleClose,
    userId: currentUserId?.toLowerCase(),
  };

  const { send } = useChatWebSocket(socket);

  const sendMessage = (recipientId: string, content: string) => {
    if (!currentUserId) return; // Ensure currentUserId is defined

    console.log({ currentUserId, recipientId });

    const newMessage: ContactMessage = {
      type: MessageType.PRIVATE_MESSAGE,
      senderId: currentUserId.toLowerCase(),
      recipientId: recipientId.toLowerCase(),
      content: content,
      timeStamp: new Date().toISOString(),
    };

    send(newMessage);

    dispatch({ type: 'ADD_OR_UPDATE_CONTACT', payload: newMessage });
  };

  const sendWebSocketMessage = (message: unknown) => {
    dispatch({ type: 'ADD_USER', payload: message as ContactMessage });

    send(message);
  };

  const value = { currentUserId, contacts, selectedContact, setSelectedContact, sendMessage, sendWebSocketMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
