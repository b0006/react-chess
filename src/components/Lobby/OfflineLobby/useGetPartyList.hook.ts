import { useEffect } from 'react';
import { useNotification } from '../../common';
import { UnknownObject } from '../../../agent';
import { useFetchDataApi } from '../../../hooks';
import { partyStore } from '../../../store';
import { ChessParty } from '../../../store/partyStore/types';

export const useGetPartyList = () => {
  const { setPartyList, removePartyById } = partyStore;

  const { addNotification } = useNotification();
  const [isFetchingList, fetchPartyList] = useFetchDataApi<UnknownObject, ChessParty[]>(
    '/api/chess/profile',
    'GET',
  );

  const [isRemoving, fetchRemoveParty] = useFetchDataApi<UnknownObject, { status: boolean }>(
    '',
    'DELETE',
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

  const onRemoveParty = async (partyId: string) => {
    const { error, response } = await fetchRemoveParty(undefined, `/api/chess/${partyId}`);

    if (error || !response?.status) {
      addNotification(
        { title: 'Error', description: error?.toString() || 'Failed fetch party list' },
        { appearance: 'error' },
      );
      return;
    }

    removePartyById(partyId);
  };

  return { isLoading: isFetchingList || isRemoving, onRemoveParty };
};
