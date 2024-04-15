import { MessageType } from '@context/ChatTypes';
import { showToast } from '@utils/ShowToast';
import { useEffect, useRef } from 'react';

interface UseChatWebSocketProps {
  onMessage: (event: MessageEvent) => void;
  onClose: () => void;
  currentUser: string | null | undefined;
}

const useChatWebSocket = ({ onMessage, onClose, currentUser }: UseChatWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');
    wsRef.current = websocket;

    const handleOpen = () => {
      const registerMessage = {
        type: MessageType.REGISTER,
        currentUser,
      };
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(registerMessage));
      }
    };
    websocket.onopen = handleOpen;
    websocket.onmessage = onMessage;
    websocket.onclose = onClose;
    websocket.onerror = () => {
      showToast('Could not connect to server', 'error');
    };

    return () => websocket.close();
  }, [onMessage, onClose, currentUser]);

  const send = (message: unknown) => {
    if (!wsRef.current) {
      showToast('WebSocket is not initialized', 'error');
      return;
    }

    if (wsRef.current.readyState !== WebSocket.OPEN) {
      showToast('No WebSocket Connection', 'error');
      return;
    }

    try {
      const messageJson = JSON.stringify(message);
      wsRef.current.send(messageJson);
    } catch (error) {
      showToast('Error sending message', 'error');
    }
  };

  return { send };
};

export default useChatWebSocket;
