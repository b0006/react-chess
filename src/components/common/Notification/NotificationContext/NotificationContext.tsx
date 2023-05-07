/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';

export enum ACTIONS {
  add,
  update,
  remove,
  removeAll,
  close,
}

export interface NotificationState {
  list: any[];
}

type Action =
  | { type: ACTIONS.add; payload: any }
  | { type: ACTIONS.close; payload: any }
  | { type: ACTIONS.remove; payload: any }
  | { type: ACTIONS.removeAll };

export type NotificationDispatch = Dispatch<Action>;

const initialState: NotificationState = {
  list: [],
};

const NotificationStateContext = createContext(initialState);
const NotificationDispatchContext = createContext<NotificationDispatch>(() => ({}));

const reducer = (state: NotificationState, action: Action): NotificationState => {
  switch (action.type) {
    case ACTIONS.add: {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }
    case ACTIONS.close: {
      return {
        ...state,
        list: state.list.map((n) => {
          if (n.id !== action.payload.id) {
            return n;
          }

          return {
            ...n,
            needClose: true,
          };
        }),
      };
    }
    case ACTIONS.remove: {
      return {
        ...state,
        list: state.list.filter((n) => n.id !== action.payload.id),
      };
    }
    case ACTIONS.removeAll: {
      return {
        ...state,
        list: state.list.map((n) => ({
          ...n,
          needClose: true,
        })),
      };
    }
    default: {
      return state;
    }
  }
};

const NotificationProvider: FC<{ children?: ReactNode | ReactNode[] }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

const useNotificationState = (): NotificationState => {
  const context = useContext(NotificationStateContext);
  if (typeof context === 'undefined') {
    throw new Error('useNotificationState must be used within a NotificationProvider');
  }
  return context;
};

const useNotificationDispatch = (): NotificationDispatch => {
  const context = useContext(NotificationDispatchContext);
  if (typeof context === 'undefined') {
    throw new Error('useNotificationDispatch must be used within a NotificationProvider');
  }
  return context;
};

const useNotificationContext = (): [NotificationState, NotificationDispatch] => [
  useNotificationState(),
  useNotificationDispatch(),
];

export { NotificationProvider, useNotificationContext };
