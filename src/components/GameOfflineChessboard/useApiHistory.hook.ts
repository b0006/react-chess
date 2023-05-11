import { useFetchDataApi } from '../../hooks';
import { partyStore } from '../../store';
import { ChessParty } from '../../store/partyStore/types';
import { OnMoveCallback } from '../Chessboard';
import { useNotification } from '../common';
import { UseApiHistory } from './types';

export const useApiHistory = ({ viewParty }: UseApiHistory) => {
  const { updatePartyData } = partyStore;

  const [isLoading, fetchUpdatePartyData] = useFetchDataApi<
    Partial<ChessParty>,
    { status: boolean }
  >('', 'POST');
  const { addNotification } = useNotification();

  const onMoveCallback = async (status: OnMoveCallback) => {
    const { error, response } = await fetchUpdatePartyData(status, `/api/chess/${viewParty.id}`);

    if (error || !response?.status) {
      addNotification(
        { title: 'Error', description: error?.toString() || 'Error update the party data' },
        { appearance: 'error' },
      );
      return;
    }

    updatePartyData(status);
  };

  return { isLoading, onMoveCallback };
};
