export enum MessageType {
  REGISTER = 'register',
  PRIVATE_MESSAGE = 'private_message',
  ADD_USER = 'add_user',
}

export interface ContactMessage {
  type: MessageType;
  senderId: string;
  recipientId: string;
  content?: string;
  timeStamp?: string;
}

export interface ContactsProps {
  contactId: string;
  messages: ContactMessage[];
}
