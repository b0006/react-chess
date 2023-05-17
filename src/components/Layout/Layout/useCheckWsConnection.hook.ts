import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { URL_DATA } from '../../../router';
import { UrlData } from '../../../router/types';

const isUrlWithWs = (pathname: string, urlData: UrlData): boolean => {
  return Object.values(urlData).reduce((result, pathItem) => {
    if (result) {
      return result;
    }

    if (pathItem.path === pathname && pathItem.withWsConnection) {
      return true;
    }

    if (Object.values(pathItem.children).length) {
      return isUrlWithWs(pathname, pathItem.children);
    }

    return result;
  }, false);
};

export const useCheckWsConnection = ({ wsDisconnect }: { wsDisconnect: () => void }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const withWs = isUrlWithWs(pathname, URL_DATA);
    if (!withWs) {
      wsDisconnect();
    }
  }, [pathname, wsDisconnect]);
};
