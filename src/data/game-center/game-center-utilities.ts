import { MazePathCell, MazeCell } from '../../models/games/MazeCell'
import { Game, MazeStep } from './game.center.state';

export function numberOfMatchingSteps(currentGame: Game): number {
    let nMatches = 0;
    for (let i = 0; i < currentGame.retracePathCells.length; i++) {
        if ((currentGame.mazePathCells.length > i) && (currentGame.mazePathCells.length > 1)) {
            if ((currentGame.retracePathCells[i].col === currentGame.mazePathCells[i].col) && (currentGame.retracePathCells[i].row === currentGame.mazePathCells[i].row)) {
                nMatches++;
            }
        }
    }
    return nMatches;
  }
  
  export function numberOfTurns(currentGame: Game, myMazePath: MazePathCell[]): number {
    const lastRowIndex = currentGame.nRows - 1;
    const lastColumnIndex = currentGame.nCols - 1;
    let nTurns = 0;
    if (myMazePath.length === 0) {
        return 0;
    } else if (myMazePath.length === 2) {
        if ((myMazePath[0].row === 0 && (myMazePath[0].col === 0 || myMazePath[0].col === lastColumnIndex)) ||
            (myMazePath[0].row === lastRowIndex && (myMazePath[0].col === 0 || myMazePath[0].col === lastColumnIndex))) {
            return 0;
        } else if (((myMazePath[0].row === 0 || myMazePath[0].row === lastRowIndex) && (myMazePath[0].col !== myMazePath[1].col)) ||
            ((myMazePath[0].col === 0 || myMazePath[0].col === lastColumnIndex) && (myMazePath[0].row !== myMazePath[1].row))) {
            nTurns = 1;
        }
    }
    if (myMazePath.length > 2) {
        if (((myMazePath[0].row === 0 || myMazePath[0].row === lastRowIndex) && (myMazePath[0].col !== myMazePath[1].col)) ||
            ((myMazePath[0].col === 0 || myMazePath[0].col === lastColumnIndex) && (myMazePath[0].row !== myMazePath[1].row))) {
            nTurns = 1;
        }
        for (var i = 2; i <= myMazePath.length - 1; i++) {
            if ((myMazePath[i].col !== myMazePath[i - 2].col) && (myMazePath[i].row !== myMazePath[i - 2].row)) {
                nTurns++;
            }
        }
    }
    return nTurns;
  }

  export const drawPathOnMaze = (maze: MazeCell[][], path: MazePathCell[], isTrace: boolean = false, isDone: boolean = false) => {
    const lastRowIndex = maze.length - 1;
    const lastColumnIndex = maze[0].length - 1;
    let mazeCell = maze[path[0].row][path[0].col];
    if (isTrace) mazeCell.outTraceImageSrc = "/assets/img/path/Empty.svg"; else mazeCell.outImageSrc = "/assets/img/path/Empty.svg";
    if (mazeCell.row === 0) {
      isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InTopTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InTop.svg";
    } else if (mazeCell.row === 7) {
      isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InBottomTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InBottom.svg";
    } else if (mazeCell.col === 0) {
      isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InLeftTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InLeft.svg";
    } else if (mazeCell.col === 7) {
      isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InRightTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InRight.svg";
    }
    mazeCell.isPath = true;
    mazeCell.isEntryPoint = true;
    mazeCell.cssClassName = "square-entry-cell"
    for (let n = 1; n < path.length; n++) {
      mazeCell = maze[path[n].row][path[n].col];
      mazeCell.isPath = true;
      mazeCell.cssClassName = "square-path";
      let previousMazeCell = maze[path[n - 1].row][path[n - 1].col];
      if (mazeCell.row === previousMazeCell.row) {
        if (mazeCell.col < previousMazeCell.col) {
          isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InRightTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InRight.svg";
          isTrace ? previousMazeCell.outTraceImageSrc = "/assets/img/path/OutLeftTrace.svg" : previousMazeCell.outImageSrc = "/assets/img/path/OutLeft.svg";
        } else {
          isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InLeftTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InLeft.svg";
          isTrace ? previousMazeCell.outTraceImageSrc = "/assets/img/path/OutRightTrace.svg" : previousMazeCell.outImageSrc = "/assets/img/path/OutRight.svg";
        }
      } else if (mazeCell.col === previousMazeCell.col) {
        if (mazeCell.row < previousMazeCell.row) {
          isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InBottomTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InBottom.svg";
          isTrace ? previousMazeCell.outTraceImageSrc = "/assets/img/path/OutTopTrace.svg" : previousMazeCell.outImageSrc = "/assets/img/path/OutTop.svg";
        } else {
          isTrace ? mazeCell.inTraceImageSrc = "/assets/img/path/InTopTrace.svg" : mazeCell.inImageSrc = "/assets/img/path/InTop.svg";
          isTrace ? previousMazeCell.outTraceImageSrc = "/assets/img/path/OutBottomTrace.svg" : previousMazeCell.outImageSrc = "/assets/img/path/OutBottom.svg";
        }
      }
    }
    mazeCell.isExitPoint = true;
    mazeCell.isCurrentCell = true;
    mazeCell.cssClassName = "square-exit-cell";
    if (isDone) {
      if (mazeCell.row === 0) {
        isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutTopTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutTop.svg";
      } else if (mazeCell.row === lastRowIndex) {
        isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutBottomTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutBottom.svg";
      } else if (mazeCell.col === 0) {
        isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutLeftTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutLeft.svg";
      } else if (mazeCell.col === lastColumnIndex) {
        isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutRightTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutRight.svg";
      }
    }
  }

  export const handleCurrentCellChange = (currentGame: Game, gameStep: MazeStep, row: number, column: number): Game =>  {
    let newGameState = currentGame;
        let currentPath: MazePathCell[] = [];
        switch (gameStep) {
          case MazeStep.EnterMazeCreate:
            newGameState.gameStep = MazeStep.CreatePath;
            currentPath = currentGame.mazePathCells;
            break;
          case MazeStep.CreatePath:
            currentPath = currentGame.mazePathCells;
            break;
          case MazeStep.EnterMazeTrace:
            newGameState.gameStep = MazeStep.Retracing;
            currentPath = currentGame.retracePathCells;
            break;
          case MazeStep.Retracing:
            currentPath = currentGame.retracePathCells;
            break;
        }
        let backingUpOneStep = false;
        if (currentGame.mazeCells[row][column].isPreviousCell) {
          backingUpOneStep = true;
        }
        newGameState.canExitMaze = currentGame.mazeCells[row][column].isEdge;
        for (let r = 0; r < currentGame.nRows; r++) {
          for (let c = 0; c < currentGame.nCols; c++) {
            newGameState.mazeCells[r][c].isEnterable = false;
            newGameState.mazeCells[r][c].isPreviousCell = false;
            newGameState.mazeCells[r][c].isCurrentCell = false;
            newGameState.mazeCells[r][c].isExitPoint = false;
          }
        }
        newGameState.mazeCells[row][column].isPath = true;
        newGameState.mazeCells[row][column].isCurrentCell = true;
        if (backingUpOneStep) {
          if (currentPath.length >= 2) {
            newGameState.mazeCells[currentPath[currentPath.length - 1].row][
              currentPath[currentPath.length - 1].col
            ].isPath = false;
            newGameState.mazeCells[currentPath[currentPath.length - 1].row][
              currentPath[currentPath.length - 1].col
            ].inImageSrc = "/assets/img/path/Empty.svg";
            newGameState.mazeCells[currentPath[currentPath.length - 1].row][
              currentPath[currentPath.length - 1].col
            ].outImageSrc = "/assets/img/path/Empty.svg";
            if (currentPath.length >= 3) {
              newGameState.mazeCells[currentPath[currentPath.length - 2].row][
                currentPath[currentPath.length - 2].col
              ].outImageSrc = "/assets/img/path/Empty.svg";
            }
          }
          currentPath.pop();
        } else {
          currentPath.push({ row: row, col: column });
        }
        if (currentPath.length >= 2) {
          newGameState.mazeCells[currentPath[currentPath.length - 2].row][
            currentPath[currentPath.length - 2].col
          ].isEnterable = true;
          newGameState.mazeCells[currentPath[currentPath.length - 2].row][
            currentPath[currentPath.length - 2].col
          ].isPreviousCell = true;
        }
        if (row > 0 && !newGameState.mazeCells[row - 1][column].isPath) {
          newGameState.mazeCells[row - 1][column].isEnterable = true;
        }
        if (
          row < currentGame.nRows - 1 &&
          !newGameState.mazeCells[row + 1][column].isPath
        ) {
          newGameState.mazeCells[row + 1][column].isEnterable = true;
        }
        if (column > 0 && !newGameState.mazeCells[row][column - 1].isPath) {
          newGameState.mazeCells[row][column - 1].isEnterable = true;
        }
        if (
          column < currentGame.nCols - 1 &&
          !newGameState.mazeCells[row][column + 1].isPath
        ) {
          newGameState.mazeCells[row][column + 1].isEnterable = true;
        }
        if (currentPath.length === 1) {
          newGameState.mazeCells[row][column].isEntryPoint = true;
        }
        for (let nRow = 0; nRow < currentGame.nRows; nRow++) {
          for (let nCol = 0; nCol < currentGame.nCols; nCol++) {
            newGameState.mazeCells[nRow][nCol].displayString =
              nRow + ", " + nCol;
            if (newGameState.mazeCells[nRow][nCol].isCurrentCell) {
              newGameState.mazeCells[nRow][nCol].cssClassName =
                "square-current-cell";
            } else if (newGameState.mazeCells[nRow][nCol].isPreviousCell) {
              newGameState.mazeCells[nRow][nCol].cssClassName =
                "square-previous-cell";
            } else if (newGameState.mazeCells[nRow][nCol].isEntryPoint) {
              newGameState.mazeCells[nRow][nCol].cssClassName =
                "square-entry-cell";
            } else if (newGameState.mazeCells[nRow][nCol].isExitPoint) {
              newGameState.mazeCells[nRow][nCol].cssClassName =
                "square-exit-cell";
            } else if (newGameState.mazeCells[nRow][nCol].isEnterable) {
              newGameState.mazeCells[nRow][nCol].cssClassName =
                "square-enterable";
            } else if (newGameState.mazeCells[nRow][nCol].isPath) {
              newGameState.mazeCells[nRow][nCol].cssClassName = "square-path";
            } else {
              newGameState.mazeCells[nRow][nCol].cssClassName = "square";
            }
          }
        }
        if (
          gameStep === MazeStep.EnterMazeCreate ||
          gameStep === MazeStep.CreatePath
        ) {
          currentGame.mazePathCells = currentPath;
        } else {
          currentGame.retracePathCells = currentPath;
        }
        drawPathOnMaze(currentGame.mazeCells, currentPath, false, false);
return newGameState;
  }
  