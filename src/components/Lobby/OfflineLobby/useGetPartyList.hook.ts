import { useEffect } from 'react';
import { useNotification } from '../../common';
import { UnknownObject } from '../../../agent';
import { useFetchDataApi } from '../../../hooks';
import { partyStore } from '../../../store';
import { ChessParty } from '../../../store/partyStore/types';

export const useGetPartyList = () => {
  const { setPartyList } = partyStore;

  const { addNotification } = useNotification();
  const [isLoading, fetchPartyList] = useFetchDataApi<UnknownObject, ChessParty[]>(
    '/api/chess/profile',
    'GET',
  );

  useEffect(() => {
    const getPartyList = async () => {
      const { error, response } = await fetchPartyList();

      if (error || !response) {
        addNotification(
          { title: 'Error', description: error?.toString() || 'Failed fetch party list' },
          { appearance: 'error' },
        );
        return;
      }

      setPartyList(response);
    };

    getPartyList();
  }, [addNotification, fetchPartyList, setPartyList]);

  return { isLoading };
};
