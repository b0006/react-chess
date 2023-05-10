import { ChessParty } from '../../../store/partyStore/types';

export interface PartyListProps {
  list: ChessParty[];
  onPartyStart: (partyId: string) => void;
}
