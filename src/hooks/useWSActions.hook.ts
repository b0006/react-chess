import { useCallback } from 'react';
import { WS, WSMessage } from '../store/wsStore/types';

interface UseWSActions {
  ws: WS | null;
}

interface UseWsActionsReturn {
  sendWsMsg: (event: string, message: WSMessage) => void;
  listenWsMsg: (event: string, callback: (message: WSMessage) => void) => void;
}

const useWSActions = ({ ws }: UseWSActions): UseWsActionsReturn => {
  const sendWsMsg = (event: string, message: WSMessage) => {
    ws?.emit(event, JSON.stringify(message));
  };

  const listenWsMsg = useCallback(
    (event: string, callback: (message: WSMessage) => void) => {
      ws?.on(event, (message: WSMessage) => {
        callback(message);
      });
    },
    [ws],
  );

  return { sendWsMsg, listenWsMsg };
};

export { useWSActions };
