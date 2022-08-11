import {MazeCell, MazePathCell} from '../../models/games/MazeCell';
import {MazeBeacon} from '../../models/games/MazeBeacon';
import { GamePlayed } from '../../models/games/GamePlayed';

export enum MazeStep {
  Init,
  EnterMazeCreate,
  CreatePath,
  ReviewCreatedPath,
  EnterMazeTrace,
  Retracing,
  ResultsPlayAgain
}

export interface MazeCellLocation {
  row: number;
  column: number;
}

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
  gameStep: MazeStep;
  loading?: boolean;
  url: string;
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

export interface GameCenterState {
  name: string;
  loading?: boolean;
  menuEnabled: boolean;
  currentGame: Game;
  beacons: MazeBeacon[];
  games: Game[];
  gamesPlayed: GamePlayed[];
}