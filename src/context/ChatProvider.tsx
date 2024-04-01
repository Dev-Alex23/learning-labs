import { FC, ReactNode, useEffect, useRef, useState } from 'react';
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
  content: string;
  timeStamp: string;
}

export interface ContactsProps {
  contactId: string;
  messages: ContactMessage[];
}

export const ChatProvider: FC<ChatProviderProps> = ({ children, currentUserId }) => {
  const [contacts, setContacts] = useState<ContactsProps[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const wsURL = 'ws://localhost:8080';

  useEffect(() => {
    wsRef.current = new WebSocket(wsURL);
    const websocket = wsRef.current;

    websocket.onopen = () => {
      const registerCurrentUser = {
        type: MessageType.REGISTER,
        userId: currentUserId,
      };

      websocket.send(JSON.stringify(registerCurrentUser));
    };

    websocket.onmessage = (event) => {
      const message: ContactMessage = JSON.parse(event.data);
      console.log({ message });

      switch (message.type) {
        // case MessageType.PRIVATE_MESSAGE: {
        //   console.log('hit');

        //   setContacts((prevContacts) =>
        //     prevContacts.map((contact) => {
        //       const isContact = prevContacts.some((contact) => contact.contactId === message.senderId);
        //       console.log({ isContact });

        //       if (!isContact) {
        //         return [...prevContacts, { contactId: message.senderId, messages: [message] }];
        //       }
        //       return contact.contactId === message.senderId || contact.contactId === message.recipientId
        //         ? { ...contact, messages: [...contact.messages, message] }
        //         : contact;
        //     })
        //   );
        //   break;
        // }
        case MessageType.PRIVATE_MESSAGE: {
          setContacts((prevContacts) => {
            const isContact = prevContacts.some((contact) => contact.contactId === message.senderId);

            if (!isContact) {
              // Directly return a new array of ContactsProps, adding the new contact with the message
              return [...prevContacts, { contactId: message.senderId, messages: [message] }];
            }

            // If the sender is already a contact, map through and update
            return prevContacts.map((contact) =>
              contact.contactId === message.senderId || contact.contactId === message.recipientId
                ? { ...contact, messages: [...contact.messages, message] }
                : contact
            );
          });
          break;
        }

        case MessageType.ADD_USER: {
          console.log('Adding a new user:', message);
          setContacts((prevContacts) => {
            const isContact = prevContacts.some((contact) => contact.contactId === message.recipientId);
            if (isContact) {
              return prevContacts;
            }
            return [...prevContacts, { contactId: message.recipientId, messages: [] }];
          });
          break;
        }

        default:
          console.log('Unhandled message type:', message.type);
          break;
      }
    };

    return () => {
      websocket.close();
    };
  }, [currentUserId]);

  const sendWebSocketMessage = (message: unknown) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  const sendMessage = (recipientId: string, content: string) => {
    if (!currentUserId) return; // Ensure currentUserId is defined

    const newMessage: ContactMessage = {
      type: MessageType.PRIVATE_MESSAGE,
      senderId: currentUserId,
      recipientId: recipientId,
      content: content,
      timeStamp: new Date().toISOString(),
    };

    sendWebSocketMessage(newMessage);

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.contactId === currentUserId || contact.contactId === recipientId
          ? { ...contact, messages: [...contact.messages, newMessage] }
          : contact
      )
    );
  };

  const value = { currentUserId, contacts, sendWebSocketMessage, selectedContact, setSelectedContact, sendMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
