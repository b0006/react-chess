import { useEffect } from 'react';
import { UnknownObject } from '../../../agent';
import { useFetchDataApi } from '../../../hooks';
import { partyStore } from '../../../store';
import { ChessParty } from '../../../store/partyStore/types';

export const useGetPartyList = () => {
  const { setOfflinePartyList } = partyStore;

  const [isLoading, fetchPartyList] = useFetchDataApi<UnknownObject, ChessParty[]>(
    '/api/chess/profile',
    'GET',
  );

  useEffect(() => {
    const getPartyList = async () => {
      const { error, response } = await fetchPartyList();

      if (error || !response) {
        // TODO: add notification
        return;
      }

      const offlinePartyList = response.filter((party) => party.isVersusAi);
      setOfflinePartyList(offlinePartyList);
    };

    getPartyList();
  }, []);

  return { isLoading };
};
