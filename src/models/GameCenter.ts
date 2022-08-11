import {MazeCell, MazePathCell} from '../models/games/MazeCell';
import { MazeBeacon } from '../models/games/MazeBeacon';
import { GamePlayed } from '../models/games/GamePlayed';

export const EmptyCurrentGame = {"id": 0, "name": "Dudley", "description": "place holder", 
"gameStep": 0, "iconImg": "", "isAvail": false, "loading": false, "mazeCells": [], "mazePath": "", "mazePathCells": [], "retracePathCells": [], 
"nCols": 0, "nRows": 0, "rating": "", "url": "","canExitMaze":false, "numberOfSquares": 0, "score": 0, "degreeOfDifficulty": 0, "numberOfStepsMaze": 0, 
"numberOfTurnsMaze": 0, "numberOfStepsRetrace": 0, "numberOfTurnsRetrace": 0, "matchingSteps": 0 };


export interface Game {
  id: number;
  name: string;
  description: string;
  rating: string;
  iconImg: string;
  isAvail: boolean;
  nRows: number;
  nCols: number;
  mazePath: string;
  mazeCells: MazeCell[][];
  mazePathCells: MazePathCell[];
  retracePathCells: MazePathCell[];
  url: string;
  gameStep: number;
  canExitMaze: boolean;
  numberOfSquares: number;
  score: number;
  degreeOfDifficulty: number;
  numberOfStepsMaze: number;
  numberOfTurnsMaze: number;
  numberOfStepsRetrace: number;
  numberOfTurnsRetrace: number;
  matchingSteps: number;
}

export interface GameCenter {
  name: string;
  loading: false;
  menuEnabled: true;
  currentGame: Game;
  beacons: MazeBeacon[];
  games: Game[];
  gamesPlayed: GamePlayed[];
  }