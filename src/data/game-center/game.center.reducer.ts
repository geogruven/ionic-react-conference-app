import { MazeCell} from "../../models/games/MazeCell";
import { GamePlayed } from "../../models/games/GamePlayed";
import { GameCenterActions } from "./game.center.actions";
import { GameCenterState, MazeStep } from "./game.center.state";
import {
  numberOfTurns,
  numberOfMatchingSteps,
  drawPathOnMaze,
  handleCurrentCellChange,
} from "./game-center-utilities";
import { setGamesPlayedData } from "../dataApi";

export const gameCenterReducer = (
  state: GameCenterState,
  action: GameCenterActions
): GameCenterState => {
  var tempMazeCells: MazeCell[][] = [];

  switch (action.type) {
    case "set-game-center-loading":
      return { ...state, loading: action.isLoading };
    case "set-game-center-data": {
      return { ...state, ...action.gameCenterData };
    }
    case "set-current-game-step": {
      let newCurrentGame = { ...state.currentGame };
      newCurrentGame.gameStep = action.gameStep;
      switch (action.gameStep) {
        case MazeStep.EnterMazeCreate:
          for (let r = 0; r < state.currentGame.nRows; r++) {
            tempMazeCells[r] = [];
            for (let c = 0; c < state.currentGame.nCols; c++) {
              tempMazeCells[r][c] = new MazeCell(
                r,
                c,
                r === 0 ||
                r === state.currentGame.nRows - 1 ||
                c === 0 ||
                c === state.currentGame.nCols - 1
                  ? true
                  : false
              );
            }
          }
          newCurrentGame.mazePath = "";
          newCurrentGame.mazePathCells = [];
          newCurrentGame.retracePathCells = [];
          newCurrentGame.mazeCells = tempMazeCells;
          break;
        case MazeStep.CreatePath:
          // Done in set-current-cell
          break;
        case MazeStep.ReviewCreatedPath:
          for (let r = 0; r < state.currentGame.nRows; r++) {
            tempMazeCells[r] = [];
            for (let c = 0; c < state.currentGame.nCols; c++) {
              tempMazeCells[r][c] = new MazeCell(r, c, false);
              tempMazeCells[r][c].inImageSrc = "/assets/img/path/Empty.svg";
              tempMazeCells[r][c].inTraceImageSrc =
                "/assets/img/path/Empty.svg";
              tempMazeCells[r][c].outImageSrc = "/assets/img/path/Empty.svg";
              tempMazeCells[r][c].outTraceImageSrc =
                "/assets/img/path/Empty.svg";
              tempMazeCells[r][c].beaconId =
                state.currentGame.mazeCells[r][c].beaconId;
            }
          }
          newCurrentGame.retracePathCells = [];
          newCurrentGame.mazeCells = tempMazeCells;
          drawPathOnMaze(
            newCurrentGame.mazeCells,
            newCurrentGame.mazePathCells,
            false,
            false
          );
          break;
        case MazeStep.EnterMazeTrace: {
          for (let r = 0; r < state.currentGame.nRows; r++) {
            tempMazeCells[r] = [];
            for (let c = 0; c < state.currentGame.nCols; c++) {
              tempMazeCells[r][c] = new MazeCell(
                r,
                c,
                r === 0 ||
                r === state.currentGame.nRows - 1 ||
                c === 0 ||
                c === state.currentGame.nCols - 1
                  ? true
                  : false
              );
            }
          }
          newCurrentGame.retracePathCells = [];
          newCurrentGame.mazeCells = tempMazeCells;
          break;
        }
        case MazeStep.Retracing:
          // Done in set-current-cell
          break;
        case MazeStep.ResultsPlayAgain:
          // calculate score
          newCurrentGame.numberOfSquares =
            newCurrentGame.nRows * newCurrentGame.nCols;
          newCurrentGame.numberOfStepsMaze =
            newCurrentGame.mazePathCells.length;
          newCurrentGame.numberOfTurnsMaze = numberOfTurns(
            newCurrentGame,
            newCurrentGame.mazePathCells
          );
          newCurrentGame.numberOfStepsRetrace =
            newCurrentGame.retracePathCells.length;
          newCurrentGame.numberOfTurnsRetrace = numberOfTurns(
            newCurrentGame,
            newCurrentGame.retracePathCells
          );
          newCurrentGame.degreeOfDifficulty =
            (newCurrentGame.mazePathCells.length /
              newCurrentGame.numberOfSquares) *
              50 +
            (numberOfTurns(newCurrentGame, newCurrentGame.mazePathCells) /
              newCurrentGame.numberOfSquares) *
              50;
          newCurrentGame.matchingSteps = numberOfMatchingSteps(newCurrentGame);
          newCurrentGame.score = Math.round(
            newCurrentGame.degreeOfDifficulty *
              (numberOfMatchingSteps(newCurrentGame) /
                newCurrentGame.mazePathCells.length)
          );

          // TODO: Save Game Played
          let dateString = Date().slice(0, Date().indexOf("GMT") - 1);
          let gamePlayed = {
            name: newCurrentGame.name,
            datePlayed: dateString,
            score: newCurrentGame.score,
          } as GamePlayed;
          let newGamesPlayed = state.gamesPlayed;
          gamePlayed.iconImg = newCurrentGame.iconImg;
          newGamesPlayed.push(gamePlayed);
          setGamesPlayedData(newGamesPlayed);

          for (let r = 0; r < state.currentGame.nRows; r++) {
            tempMazeCells[r] = [];
            for (let c = 0; c < state.currentGame.nCols; c++) {
              tempMazeCells[r][c] = new MazeCell(r, c, false);
            }
          }
          newCurrentGame.mazeCells = tempMazeCells;
          drawPathOnMaze(
            newCurrentGame.mazeCells,
            newCurrentGame.mazePathCells,
            false,
            false
          );
          drawPathOnMaze(
            newCurrentGame.mazeCells,
            newCurrentGame.retracePathCells,
            true,
            false
          );
          return {
            ...state,
            currentGame: newCurrentGame,
            gamesPlayed: newGamesPlayed,
          };
        default: {
          console.log("--");
        }
      }
      return {
        ...state,
        currentGame: newCurrentGame,
      };
    }
    case "set-current-game": {
      const gameId = action.id === 0 ? 1 : action.id;
      let newGames = state.games.filter((game) => game.id === gameId);
      let newGame = newGames[0];

      if (newGame.mazePath.length > 0) {
        newGame.gameStep = MazeStep.ReviewCreatedPath;
        newGame.mazePathCells = JSON.parse(newGame.mazePath);
      } else {
        newGame.gameStep = MazeStep.EnterMazeCreate;
      }

      for (let r = 0; r < newGame.nRows; r++) {
        newGame.mazeCells[r] = [];
        for (let c = 0; c < newGame.nCols; c++) {
          let isEdge = false;
          if (
            newGame.gameStep !== MazeStep.ReviewCreatedPath &&
            (r === 0 ||
              r === newGame.nRows - 1 ||
              c === 0 ||
              c === newGame.nCols - 1)
          ) {
            isEdge = true;
          }
          newGame.mazeCells[r][c] = new MazeCell(r, c, isEdge);
        }
      }

      state.beacons.forEach((beacon) => {
        newGame.mazeCells[beacon.row][beacon.col].beaconId = beacon.id;
        newGame.mazeCells[beacon.row][beacon.col].adjustment =
          beacon.adjustment;
      });
      return {
        ...state,
        currentGame: newGame,
      };
    }
    case "set-maze-beacons": {
      return { ...state };
    }
    case "set-current-cell": {
      const currentGame = state.currentGame;
      const gameStep = currentGame.gameStep;
      const row = action.location.row;
      const column = action.location.column;

      if (
        (gameStep === MazeStep.EnterMazeCreate ||
          gameStep === MazeStep.CreatePath ||
          gameStep === MazeStep.EnterMazeTrace ||
          gameStep === MazeStep.Retracing) &&
        state.currentGame.mazeCells[row][column].isEnterable === true
      ) {
        let newGameState = handleCurrentCellChange(
          currentGame,
          gameStep,
          row,
          column
        );

        return { ...state, currentGame: newGameState };
      } else {
        return { ...state };
      }
    }

    case "set-maze-path-cells": {
      return { ...state };
    }

    case "set-maze-step": {
      return { ...state };
    }

    case "set-maze-game-data": {
      return { ...state, ...action.gameCenterData };
    }

    case "set-maze-cell-rssi": {
      // console.log(`>>>>>>>> setMazeCellRssi: [${action.row}][${action.col}]: ${action.rssi}`);
      let newCurrentGame = { ...state.currentGame };
      let newMazeCell = {
        ...state.currentGame.mazeCells[action.row][action.col],
      };
      newMazeCell.rssi = newMazeCell.adjustment + action.rssi;
      newMazeCell.rssiLastChange = Date.now();
      newCurrentGame.mazeCells[action.row][action.col] = newMazeCell;
      return {
        ...state,
        currentGame: newCurrentGame,
      };
    }

    case "heartbeat": {
      const currentGame = state.currentGame;
      const gameStep = currentGame.gameStep;

      console.log(`>>>> heartbeat() called.`);

      // scan stale rssi, find "current cell" & set current cell if in correct state
      if (
        gameStep === MazeStep.EnterMazeCreate ||
        gameStep === MazeStep.CreatePath ||
        gameStep === MazeStep.EnterMazeTrace ||
        gameStep === MazeStep.Retracing
      ) {
        var row = -1;
        var column = -1;
        var rssi = -127;
        var stale = Date.now() - 1000; // one second ago (milliseconds)

        // scan stale rssi and find "current cell"
        for (let nRow = 0; nRow < currentGame.nRows; nRow++) {
          for (let nCol = 0; nCol < currentGame.nCols; nCol++) {
            if (currentGame.mazeCells[nRow][nCol].rssiLastChange <= stale) {
              let newMazeCell = { ...state.currentGame.mazeCells[nRow][nCol] };
              newMazeCell.rssi = -127;
              newMazeCell.rssiLastChange = Date.now();
              currentGame.mazeCells[nRow][nCol] = newMazeCell;
            } else if (currentGame.mazeCells[nRow][nCol].rssi > rssi) {
              rssi = currentGame.mazeCells[nRow][nCol].rssi;
              row = nRow;
              column = nCol;
            }
          }
        }

        if (
          row > -1 &&
          column > -1 &&
          rssi > -127 &&
          state.currentGame.mazeCells[row][column].isEnterable === true
        ) {
          let newGameState = handleCurrentCellChange(
            currentGame,
            gameStep,
            row,
            column
          );
          return { ...state, currentGame: newGameState };
        }
      }
      return { ...state };
    }

    case "set-menu-enabled": {
      return { ...state, menuEnabled: action.menuEnabled };
    }

    default: {
      return { ...state };
    }
  }
};
