import useChatWebSocket from '@hooks/useWebsocket';
import { chatStateReducer } from '@state/chatStateReducer';
import { getCurrentFormattedTime } from '@utils/getCurrentFormattedTime';
import { FC, useCallback, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatContext } from './ChatContext';
import { ChatProviderProps, Message, MessageEventType, MessageType, State } from './ChatTypes';

export const ChatProvider: FC<ChatProviderProps> = ({ children, currentUser }) => {
  const initialState: State = {
    contacts: new Map(),
    messages: new Map(),
  };
  const [state, dispatch] = useReducer(chatStateReducer, initialState);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleMessage = useCallback(
    // TODO: LOOK UP HOW TO PROPERLY TYPE EVENT
    (event: MessageEvent) => {
      const { message, type } = JSON.parse(event.data);

      switch (type) {
        case MessageType.PRIVATE_MESSAGE: {
          const newMessage = {
            message,
            currentUser,
          };
          dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
          break;
        }
        case MessageType.ADD_USER: {
          dispatch({ type: 'ADD_CONTACT', payload: message.currentUser });
          break;
        }

        default:
          console.log('Unhandled message type:', message);
          break;
      }
    },
    [currentUser]
  );

  const { send } = useChatWebSocket({
    handleMessage,
    currentUser,
  });

  const sendMessage = useCallback(
    (recipientId: string, content: string) => {
      if (!currentUser) return;

      const message: Message = {
        messageId: uuidv4(),
        messageFrom: currentUser?.toLowerCase(),
        messageTo: recipientId.toLowerCase(),
        content,
        timestamp: getCurrentFormattedTime(),
      };

      const newMessage: MessageEventType = {
        type: MessageType.PRIVATE_MESSAGE,
        message,
      };

      send(newMessage);

      dispatch({ type: 'ADD_MESSAGE', payload: { message, currentUser } });
    },
    [currentUser, send]
  );

  const sendWebSocketMessage = useCallback(
    (message: string) => {
      const newMessage = {
        type: MessageType.ADD_USER,
        message,
      };

      send(newMessage);
    },
    [send]
  );

  const value = {
    currentUser,
    state,
    dispatch,
    selectedContact,
    setSelectedContact,
    sendMessage,
    sendWebSocketMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
