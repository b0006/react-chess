import { makeAutoObservable } from 'mobx';
import { GameData } from './types';

const initGameData: GameData = {
  isPlaying: false,
  isAutoPromotion: false,
  autopromotionPiece: 'q',
  isColoredMoves: true,
  isConfirmSteps: false,
  isAudioOn: false,
  difficult: 800,
  myColor: 'w',
};

export class GameStore {
  public game: GameData = initGameData;

  constructor() {
    makeAutoObservable(this);
  }

  public startGame = (data: Omit<GameData, 'isPlaying'>) => {
    this.game = { ...this.game, ...data, isPlaying: true };
  };
}

export default new GameStore();
