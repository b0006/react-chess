import { FC, ReactNode, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { NotificationLayout } from '../NotificationLayout';
import { NotificationItem } from '../NotificationItem';
import { Content, Options } from '../types';
import { generateUUIDv4 } from '../utils';

import { useNotificationContext, ACTIONS } from './NotificationContext';

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

interface Props {
  portalTargetSelector?: string;
  children?: ReactNode | ReactNode[];
}

export const Provider: FC<Props> = ({ portalTargetSelector, children }) => {
  const [state] = useNotificationContext();

  const portalTarget = canUseDOM
    ? portalTargetSelector
      ? document.querySelector(portalTargetSelector)
      : document.body
    : null;

  return (
    <>
      {children}
      {portalTarget ? (
        createPortal(
          <NotificationLayout>
            {state.list.map((item) => (
              <NotificationItem
                key={item.id}
                id={item.id}
                appearance={item.appearance}
                title={item.content.title}
                description={item.content.description}
                needClose={item.needClose}
              />
            ))}
          </NotificationLayout>,
          portalTarget,
        )
      ) : (
        <NotificationLayout />
      )}
    </>
  );
};

export const useNotification = (): {
  addNotification: (content: Content, options?: Options) => string | undefined;
  removeNotification: (id: string) => void;
  removeAllNotifications: () => void;
} => {
  const [state, dispatch] = useNotificationContext();

  const hasAlready = useCallback(
    (id: string): boolean => {
      if (!state.list.length) {
        return false;
      }

      return !!state.list.filter((n) => n.id === id).length;
    },
    [state.list],
  );

  const add = useCallback(
    (content: Content, options: Options = {}): string | undefined => {
      const id = options.id ? options.id : generateUUIDv4();

      if (hasAlready(id)) {
        return;
      }

      dispatch({ type: ACTIONS.add, payload: { content, id, ...options } });

      return id;
    },
    [dispatch, hasAlready],
  );

  const remove = (id: string): void => {
    if (!hasAlready(id)) {
      return;
    }

    dispatch({ type: ACTIONS.close, payload: { id } });
  };

  const removeAll = (): void => {
    dispatch({ type: ACTIONS.removeAll });
  };

  return {
    addNotification: add,
    removeNotification: remove,
    removeAllNotifications: removeAll,
  };
};
