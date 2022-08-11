import { getGameCenterData } from '../dataApi';
import { ActionType } from '../../util/types';
import { GameCenterState, MazeStep, MazeCellLocation } from './game.center.state';

export const loadGameCenterData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setGameCenterLoading(true));
  const gameCenterData = await getGameCenterData();
  dispatch(setGameCenterData(gameCenterData));
  dispatch(setGameCenterLoading(true));
};

export const setGameCenterLoading = (isLoading: boolean) => ({
  type: 'set-game-center-loading',
  isLoading
} as const);

export const setGameCenterData = (gameCenterData: Partial<GameCenterState>) => ({
  type: 'set-game-center-data',
  gameCenterData
} as const);

export const setCurrentGameStep = (gameStep: MazeStep) => ({
  type: 'set-current-game-step',
  gameStep
} as const);

export const setCurrentGame = (id: number) => ({
  type: 'set-current-game',
  id
} as const);

export const setCurrentCell = (location: MazeCellLocation) => ({
  type: 'set-current-cell',
  location,
} as const);

export const setMazeBeacons = (gameCenterData: Partial<GameCenterState>) => ({
  type: 'set-maze-beacons',
  gameCenterData
} as const);

export const setMazePathCells = (gameCenterData: Partial<GameCenterState>) => ({
  type: 'set-maze-path-cells',
  gameCenterData
} as const);

export const setMazeStep = (gameMazeStep: MazeStep) => ({ 
  type: 'set-maze-step', 
  gameMazeStep 
} as const);

export const setMazeGameData = (gameCenterData: Partial<GameCenterState>) => ({
  type: 'set-maze-game-data',
  gameCenterData
} as const);

export const setMazeCellRssi = (row: number, col: number, rssi: number) => ({
  type: 'set-maze-cell-rssi',
  row, col, rssi
} as const);

export const heartbeat = () => ({
  type: 'heartbeat'
} as const);

export const setMenuEnabled = (menuEnabled: boolean) => ({ 
  type: 'set-menu-enabled', 
  menuEnabled
} as const);

export type GameCenterActions =
  | ActionType<typeof setGameCenterLoading>
  | ActionType<typeof setGameCenterData>
  | ActionType<typeof setCurrentGameStep>
  | ActionType<typeof setCurrentGame>
  | ActionType<typeof setCurrentCell>
  | ActionType<typeof setMazeBeacons>
  | ActionType<typeof setMazePathCells>
  | ActionType<typeof setMazeStep>
  | ActionType<typeof setMazeGameData>
  | ActionType<typeof setMenuEnabled>
  | ActionType<typeof setMazeCellRssi>
  | ActionType<typeof heartbeat>
