import useChatWebSocket from '@hooks/useWebsocket';
import { chatStateReducer } from '@state/chatStateReducer';
import { getCurrentFormattedTime } from '@utils/getCurrentFormattedTime';
import { FC, useCallback, useReducer, useState } from 'react';
import { ChatContext } from './ChatContext';
import { Blah, ChatProviderProps, Message, MessageType, State } from './ChatTypes';

export const ChatProvider: FC<ChatProviderProps> = ({ children, currentUser }) => {
  const initialState: State = {
    contacts: new Map(),
    messages: new Map(),
  };
  const [state, dispatch] = useReducer(chatStateReducer, initialState);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const { message, type } = JSON.parse(event.data);

      switch (type) {
        case MessageType.PRIVATE_MESSAGE: {
          const newMessage = {
            message,
            currentUser: currentUser,
          };
          dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
          break;
        }
        case MessageType.ADD_USER: {
          console.log({ message });

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

  const handleClose = () => {
    console.error('WebSocket close');
  };

  const socket = {
    onMessage: handleMessage,
    onClose: handleClose,
    currentUser,
  };

  const { send } = useChatWebSocket(socket);

  const sendMessage = (recipientId: string, content: string) => {
    if (!currentUser) return;

    console.log(recipientId);

    const message: Message = {
      messageId: '12873469182736498172364',
      messageFrom: currentUser?.toLowerCase(),
      messageTo: recipientId.toLowerCase(),
      content,
      timestamp: getCurrentFormattedTime(),
    };

    const newMessage: Blah = {
      type: MessageType.PRIVATE_MESSAGE,
      message,
    };

    send(newMessage);

    dispatch({ type: 'ADD_MESSAGE', payload: { message, currentUser: currentUser } });
  };

  const sendWebSocketMessage = (message: string) => {
    const newMessage = {
      type: MessageType.ADD_USER,
      message,
    };

    send(newMessage);
  };

  const value = { currentUser, state, selectedContact, setSelectedContact, sendMessage, sendWebSocketMessage };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
