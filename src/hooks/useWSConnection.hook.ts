import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { WS } from '../store/wsStore/types';

interface UseWSConnection {
  url?: string;
  transport?: string;
  authToken: string;
  initConnection: (socket: WS) => void;
}

const WS_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const useWSConnection = ({
  url = WS_URL,
  transport = 'websocket',
  authToken,
  initConnection,
}: UseWSConnection): void => {
  const wsRef = useRef<WS>();

  useEffect(() => {
    if (!authToken) {
      return () => {
        wsRef.current?.close();
      };
    }

    wsRef.current = io(url, {
      withCredentials: true,
      transports: [transport],
      auth: {
        token: authToken,
      },
    });
    initConnection(wsRef.current);

    return () => {
      wsRef.current?.close();
    };
  }, [transport, url, authToken, initConnection]);
};

export { useWSConnection };
