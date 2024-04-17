import { MessageType } from '@context/ChatTypes';
import { showToast } from '@utils/ShowToast';
import { useCallback, useEffect, useRef } from 'react';

interface UseChatWebSocketProps {
  handleMessage: (event: MessageEvent) => void;
  currentUser: string | null | undefined;
}

const useChatWebSocket = ({ handleMessage, currentUser }: UseChatWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const timeoutRef = useRef<number>(0);
  const attemptsRef = useRef<number>(0);
  const MAX_ATTEMPTS = 5;
  const RECONNECT_INTERVAL_BASE = 3000;
  const MAX_RECONNECT_INTERVAL = 30000;

  const connectWebsocket = useCallback(() => {
    if (attemptsRef.current >= MAX_ATTEMPTS) {
      showToast('Max reconnect attempts reached', 'error');
      return;
    }

    const websocket = new WebSocket('ws://localhost:8080');
    wsRef.current = websocket;

    websocket.onopen = () => {
      showToast('Connected', 'success');
      attemptsRef.current = 0;
      websocket.send(JSON.stringify({ type: MessageType.REGISTER, currentUser }));
    };

    websocket.onmessage = handleMessage;
    websocket.onclose = (event) => {
      if (event.wasClean) {
        showToast('Websocket closed', 'success');
      } else {
        showToast('WebSocket connection closed', 'info');
        attemptsRef.current++;
        timeoutRef.current = setTimeout(
          () => connectWebsocket(),
          Math.min(Math.pow(2, attemptsRef.current) * RECONNECT_INTERVAL_BASE, MAX_RECONNECT_INTERVAL)
        );
      }
    };

    websocket.onerror = () => {
      showToast('Could not connect to server', 'error');
    };
  }, [currentUser, handleMessage]);

  useEffect(() => {
    connectWebsocket();

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
      clearTimeout(timeoutRef.current);
      attemptsRef.current = 0;
    };
  }, [connectWebsocket]);

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
