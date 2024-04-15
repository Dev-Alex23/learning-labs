import { ReactNode } from 'react';

export interface ContactMessage {
  type: MessageType;
  senderId: string;
  recipientId: string;
  content?: string;
  timeStamp?: string;
}

export interface ChatProviderProps {
  children: ReactNode;
  currentUser: string;
}

export enum MessageType {
  REGISTER = 'register',
  PRIVATE_MESSAGE = 'private_message',
  ADD_USER = 'add_user',
}

export interface Contact {
  fullName: string;
}
export interface Message {
  messageId: string;
  messageFrom?: string;
  messageTo: string;
  content?: string;
  timestamp: string;
}

export interface MessageEventType {
  type: MessageType;
  message: Message;
}

export interface State {
  contacts: Map<string, Contact>;
  messages: Map<string, Message[]>;
}

export type StateAction =
  | { type: 'ADD_CONTACT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { message: Message; currentUser: string | null | undefined } }
  | { type: 'REMOVE_CONTACT'; payload: string };
