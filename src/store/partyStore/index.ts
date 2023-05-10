import { action, makeAutoObservable, observable } from 'mobx';
import { ChessParty } from './types';

const initPartyData: ChessParty = {
  creater: '',
  blackPlayer: null,
  whitePlayer: null,
  winPlayer: null,
  fen: null,
  pgn: null,
  resultParty: null,
  isPlaying: false,
  isVersusAi: false,
  autopromotionPiece: 'q',
  difficult: 800,
  isAudioOn: false,
  isAutoPromotion: false,
  isColoredMoves: true,
  isConfirmSteps: false,
  myColor: 'w',
};

export class PartyStore {
  public offlinePartyList: ChessParty[] = [];
  public onlinePartyList: ChessParty[] = [];
  public viewParty: ChessParty = initPartyData;

  constructor() {
    makeAutoObservable(this, {
      offlinePartyList: observable,
      onlinePartyList: observable,
      startOfflineParty: action,
    });
  }

  public startOfflineParty = (partyData: ChessParty) => {
    this.viewParty = {
      ...this.viewParty,
      ...partyData,
      isVersusAi: true,
      isPlaying: true,
    };
  };
}

export default new PartyStore();
