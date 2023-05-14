import { ChessParty } from '../../../store/partyStore/types';

export interface PartyListProps {
  list: ChessParty[];
  isDisabled: boolean;
  onRemoveParty: (partyId: string) => void;
  onPartyStart: (partyId: string) => void;
}
