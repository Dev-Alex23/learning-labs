import { MessageType } from '@context/ChatTypes';
import { useEffect, useRef } from 'react';

interface UseChatWebSocketProps {
  onMessage: (event: MessageEvent) => void;
  // onError: (event: ErrorEvent) => void;
  onClose: () => void;
  userId: string | undefined;
}

const useChatWebSocket = ({ onMessage, onClose, userId }: UseChatWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');
    wsRef.current = websocket;

    const handleOpen = () => {
      const registerMessage = {
        type: MessageType.REGISTER,
        userId,
      };
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(registerMessage));
      }
    };
    websocket.onopen = handleOpen;
    websocket.onmessage = onMessage;
    // websocket.onerror = onError;
    websocket.onclose = onClose;

    return () => websocket.close();
  }, [onMessage, onClose, userId]);

  const send = (message: unknown) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log({ message });

      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { send };
};

export default useChatWebSocket;
