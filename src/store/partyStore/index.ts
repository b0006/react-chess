import { action, makeAutoObservable, observable, computed } from 'mobx';
import { ChessParty } from './types';

const initPartyData: ChessParty = {
  id: '',
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
  createdAt: '',
  updatedAt: '',
};

export class PartyStore {
  public partyList: ChessParty[] = [];
  public viewParty: ChessParty = initPartyData;

  constructor() {
    makeAutoObservable(this, {
      partyList: observable,
      offlinePartyList: computed,
      onlinePartyList: computed,
      startOfflineParty: action,
      setPartyList: action,
    });
  }

  get onlinePartyList() {
    return this.partyList
      .filter((party) => !party.isVersusAi)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  get offlinePartyList() {
    return this.partyList
      .filter((party) => party.isVersusAi)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public setPartyList = (list: ChessParty[]) => {
    this.partyList = list.map((party) => ({
      ...party,
      myColor: party.whitePlayer ? 'w' : 'b',
    }));
  };

  public startOfflineParty = (partyData: ChessParty) => {
    this.viewParty = {
      ...this.viewParty,
      ...partyData,
      isVersusAi: true,
      isPlaying: true,
    };
  };

  // TODO: maybe update item at list
  public updatePartyData = (partyData: Partial<ChessParty>) => {
    this.viewParty = {
      ...this.viewParty,
      ...partyData,
    };
  };
}

export default new PartyStore();
