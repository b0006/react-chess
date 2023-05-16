import { useCallback } from 'react';
import { useObserver } from 'mobx-react';
import { wsStore } from '../store';
import { WSMessage } from '../store/wsStore/types';

interface UseWsActionsReturn {
  sendWsMsg: (event: string, message: WSMessage) => void;
  listenWsMsg: (event: string, callback: (message: WSMessage) => void) => void;
}

const useWSActions = (): UseWsActionsReturn => {
  const ws = useObserver(() => wsStore.ws);

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
