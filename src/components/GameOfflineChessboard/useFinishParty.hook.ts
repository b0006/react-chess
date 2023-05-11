import { useEffect } from 'react';
import { useFetchDataApi } from '../../hooks';
import { ChessParty } from '../../store/partyStore/types';
import { useNotification } from '../common';
import { UseFinishPartyProps } from './types';

export const useFinishParty = ({
  viewParty,
  gameOverState,
  updatePartyData,
}: UseFinishPartyProps) => {
  const { addNotification } = useNotification();

  const [, fetchUpdatePartyData] = useFetchDataApi<Partial<ChessParty>, { status: boolean }>(
    '',
    'POST',
  );

  useEffect(() => {
    if (gameOverState.isOnceOver && !viewParty.resultParty) {
      const updateData: Partial<ChessParty> = { resultParty: gameOverState.typeLabel };

      const execUpdate = async () => {
        const { error, response } = await fetchUpdatePartyData(
          updateData,
          `/api/chess/${viewParty.id}`,
        );

        if (error || !response?.status) {
          addNotification(
            { title: 'Error', description: error?.toString() || 'Error update the party data' },
            { appearance: 'error' },
          );
          return;
        }

        updatePartyData(updateData);
      };

      execUpdate();
    }
  }, [
    gameOverState,
    viewParty.resultParty,
    viewParty.id,
    updatePartyData,
    fetchUpdatePartyData,
    addNotification,
  ]);
};
