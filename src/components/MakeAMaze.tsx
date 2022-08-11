import { IonButton, IonCol, IonGrid, IonRow, IonImg, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import './MakeAMaze.css';
import '../models/games/MakeAMaze/MakeAMazeCell';
import { MakeAMazeCell, MakeAMazePathCell } from '../models/games/MakeAMaze/MakeAMazeCell';
import './MazeCell.css';

enum Step {
    EnterMazeCreate,
    CreatePath,
    ReviewCreatedPath,
    EnterMazeTrace,
    Retracing,
    ResultsPlayAgain
}

interface OwnProps {
    nRows: number;
    nCols: number;
    makeAMazeCells: MakeAMazeCell[][];
};

interface StateProps { }
interface DispatchProps { }
interface MakeAMazeProps extends OwnProps, StateProps, DispatchProps { };

// TODO: use context and reducer for nRows and nCols for MazeCell
// TODO: on results step, show made path and retrace path
// TODO: Timer for "Make A Path"?  Wait period? Retrace??

const MakeAMaze: React.FC<MakeAMazeProps> = ({ makeAMazeCells }) => {
    const [mazeCells, setMazeCells] = useState<Array<Array<MakeAMazeCell>>>(makeAMazeCells);
    const [step, setStep] = useState<Step>(Step.EnterMazeCreate);
    const [canExitMaze, setCanExitMaze] = useState(false);
    const [makeAMazePath, setMakeAMazePath] = useState<Array<MakeAMazePathCell>>([]);
    const [madeAMazePath, setMadeAMazePath] = useState<Array<MakeAMazePathCell>>([]);

    function numberOfMatchingSteps(): number {
        var nMatches = 0;
        for (var i = 0; i < makeAMazePath.length; i++) {
            if ((madeAMazePath.length > i) && (madeAMazePath.length > 1)) {
                if ((makeAMazePath[i].col === madeAMazePath[i].col) && (makeAMazePath[i].row === madeAMazePath[i].row)) {
                    nMatches++;
                }
            }
        }
        return nMatches;
    }

    function numberOfTurns(mazePath: MakeAMazePathCell[]): number {
        var nTurns = 0;
        if (mazePath.length === 0) {
            return 0;
        } else if (mazePath.length === 2) {
            if ((mazePath[0].row === 0 && (mazePath[0].col === 0 || mazePath[0].col === 7)) ||
                (mazePath[0].row === 7 && (mazePath[0].col === 0 || mazePath[0].col === 7))) {
                return 0;
            } else if (((mazePath[0].row === 0 || mazePath[0].row === 7) && (mazePath[0].col !== mazePath[1].col)) ||
                ((mazePath[0].col === 0 || mazePath[0].col === 7) && (mazePath[0].row !== mazePath[1].row))) {
                nTurns = 1;
            }
        }
        if (mazePath.length > 2) {
            if (((mazePath[0].row === 0 || mazePath[0].row === 7) && (mazePath[0].col !== mazePath[1].col)) ||
                ((mazePath[0].col === 0 || mazePath[0].col === 7) && (mazePath[0].row !== mazePath[1].row))) {
                nTurns = 1;
            }
            for (var i = 2; i <= mazePath.length - 1; i++) {
                if ((mazePath[i].col !== mazePath[i - 2].col) && (mazePath[i].row !== mazePath[i - 2].row)) {
                    nTurns++;
                }
            }
        }
        return nTurns;
    }

    const OnPlayAgain = () => {
        var tempMazeCells: MakeAMazeCell[][] = [];
        for (var r = 0; r < 8; r++) {
            tempMazeCells[r] = [];
            for (var c = 0; c < 8; c++) {
                tempMazeCells[r][c] = new MakeAMazeCell(r, c, (r === 0 || r === 7 || c === 0 || c === 7) ? true : false);
            }
        }
        setMazeCells(tempMazeCells);
        setStep(Step.EnterMazeCreate);
        setCanExitMaze(false);
        setMakeAMazePath([]);
        setMadeAMazePath([]);

    }

    const drawPathOnMaze = (maze: MakeAMazeCell[][], path: MakeAMazePathCell[], isTrace: boolean = false, isDone: boolean = false) => {
        var mazeCell = maze[path[0].row][path[0].col];
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
        for (var n = 1; n < path.length; n++) {
            mazeCell = maze[path[n].row][path[n].col];
            var previousMazeCell = maze[path[n - 1].row][path[n - 1].col];
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
        if (isDone) {
            if (mazeCell.row === 0) {
                isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutTopTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutTop.svg";
            } else if (mazeCell.row === 7) {
                isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutBottomTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutBottom.svg";
            } else if (mazeCell.col === 0) {
                isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutLeftTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutLeft.svg";
            } else if (mazeCell.col === 7) {
                isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutRightTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutRight.svg";
            }
        }
    }

    const setLastCellOut = (mazeCell: MakeAMazeCell, isTrace: boolean = false) => {
        if (mazeCell.row === 0) {
            isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutTopTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutTop.svg";
        } else if (mazeCell.row === 7) {
            isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutBottomTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutBottom.svg";
        } else if (mazeCell.col === 0) {
            isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutLeftTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutLeft.svg";
        } else if (mazeCell.col === 7) {
            isTrace ? mazeCell.outTraceImageSrc = "/assets/img/path/OutRightTrace.svg" : mazeCell.outImageSrc = "/assets/img/path/OutRight.svg";
        }
    }

    const onDoneTrackingPathButtonClick = () => {
        var tempMazeCells: MakeAMazeCell[][] = [];
        for (var r = 0; r < 8; r++) {
            tempMazeCells[r] = [];
            for (var c = 0; c < 8; c++) {
                tempMazeCells[r][c] = new MakeAMazeCell(r, c, false);
            }
        }
        drawPathOnMaze(tempMazeCells, madeAMazePath, false, true);
        drawPathOnMaze(tempMazeCells, makeAMazePath, true, true);
        setMazeCells(tempMazeCells);
        setStep(Step.ResultsPlayAgain)
    }

    const onReadyButtonClick = () => {
        setStep(Step.EnterMazeTrace);
        setMadeAMazePath(makeAMazePath);
        setMakeAMazePath([]);
        var tempMazeCells: MakeAMazeCell[][] = [];
        for (var r = 0; r < 8; r++) {
            tempMazeCells[r] = [];
            for (var c = 0; c < 8; c++) {
                tempMazeCells[r][c] = new MakeAMazeCell(r, c, (r === 0 || r === 7 || c === 0 || c === 7) ? true : false);
            }
        }
        setMazeCells(tempMazeCells);
    }

    const onExitButtonClick = () => {
        if (step === Step.CreatePath) {
            var newMazeCells = JSON.parse(JSON.stringify(mazeCells));
            newMazeCells[makeAMazePath[makeAMazePath.length-1].row][makeAMazePath[makeAMazePath.length-1].col].isExitPoint = true;
            for (var nRow = 0; nRow < 8; nRow++) {
                for (var nCol = 0; nCol < 8; nCol++) {
                    if (newMazeCells[nRow][nCol].isCurrentCell) {
                        newMazeCells[nRow][nCol].cssClassName = "square-current-cell";
                    } else if (newMazeCells[nRow][nCol].isEntryPoint) {
                        newMazeCells[nRow][nCol].cssClassName = "square-entry-cell";
                    } else if (newMazeCells[nRow][nCol].isExitPoint) {
                        newMazeCells[nRow][nCol].cssClassName = "square-exit-cell";
                    } else if (newMazeCells[nRow][nCol].isPath) {
                        newMazeCells[nRow][nCol].cssClassName = "square-path";
                    } else {
                        newMazeCells[nRow][nCol].cssClassName = "square";
                    }
                }
            }
            // setLastCellOut()
            setMazeCells(newMazeCells);
            setStep(Step.ReviewCreatedPath);
        }
    }

    const onCellClicked = (row: number, col: number) => {
        if (step === Step.EnterMazeCreate || step === Step.CreatePath || Step.EnterMazeTrace || Step.Retracing) {
            // Building Maze path
            // backing up one?
            if (!mazeCells[row][col].isEnterable) { return };
            if (step === Step.EnterMazeTrace) {
                setStep(Step.Retracing);
            } else if (step !== Step.Retracing) {
                setStep(Step.CreatePath);
            }
            var backingUpOneStep = false;
            if (mazeCells[row][col].isPreviousCell) {
                backingUpOneStep = true;
            }
            setCanExitMaze(mazeCells[row][col].isEdge);
            var newMazeCells = JSON.parse(JSON.stringify(mazeCells));
            // reset: isEnterable, isCurrentCell and isPrevious 
            for (var r = 0; r < 8; r++) {
                for (var c = 0; c < 8; c++) {
                    newMazeCells[r][c].isEnterable = false;
                    newMazeCells[r][c].isPreviousCell = false;
                    newMazeCells[r][c].isCurrentCell = false;
                }
            }
            newMazeCells[row][col].isPath = true;
            newMazeCells[row][col].isCurrentCell = true;
            let newMakeAMazePath = makeAMazePath;
            if (backingUpOneStep) {
                if (newMakeAMazePath.length >= 2) {
                    newMazeCells[newMakeAMazePath[newMakeAMazePath.length - 1].row][newMakeAMazePath[newMakeAMazePath.length - 1].col].isPath = false;
                    newMazeCells[newMakeAMazePath[newMakeAMazePath.length - 1].row][newMakeAMazePath[newMakeAMazePath.length - 1].col].inImageSrc = "/assets/img/path/Empty.svg";
                    newMazeCells[newMakeAMazePath[newMakeAMazePath.length - 1].row][newMakeAMazePath[newMakeAMazePath.length - 1].col].outImageSrc = "/assets/img/path/Empty.svg";
                    if (newMakeAMazePath.length >= 3) {
                        newMazeCells[newMakeAMazePath[newMakeAMazePath.length - 2].row][newMakeAMazePath[newMakeAMazePath.length - 2].col].outImageSrc = "/assets/img/path/Empty.svg";
                    }
                }
                newMakeAMazePath.pop();

            } else {
                newMakeAMazePath.push({ row: row, col: col });
            }
            if (newMakeAMazePath.length >= 2) {
                newMazeCells[newMakeAMazePath[newMakeAMazePath.length - 2].row][newMakeAMazePath[newMakeAMazePath.length - 2].col].isEnterable = true;
                newMazeCells[newMakeAMazePath[newMakeAMazePath.length - 2].row][newMakeAMazePath[newMakeAMazePath.length - 2].col].isPreviousCell = true;
            }
            // set up to four adjacent cells to isEnterable
            if (row > 0 && !newMazeCells[row - 1][col].isPath) { newMazeCells[row - 1][col].isEnterable = true; };
            if (row < 7 && !newMazeCells[row + 1][col].isPath) { newMazeCells[row + 1][col].isEnterable = true; };
            if (col > 0 && !newMazeCells[row][col - 1].isPath) { newMazeCells[row][col - 1].isEnterable = true; };
            if (col < 7 && !newMazeCells[row][col + 1].isPath) { newMazeCells[row][col + 1].isEnterable = true; };
            if (newMakeAMazePath.length === 1) {
                newMazeCells[row][col].isEntryPoint = true;
                newMazeCells[row][col].isPath = true;
                newMazeCells[row][col].isEnterable = false;
            }
            for (var nRow = 0; nRow < 8; nRow++) {
                for (var nCol = 0; nCol < 8; nCol++) {
                    newMazeCells[nRow][nCol].displayString = nRow + ", " + nCol;
                    if (newMazeCells[nRow][nCol].isCurrentCell) {
                        newMazeCells[nRow][nCol].cssClassName = "square-current-cell";
                    } else if (newMazeCells[nRow][nCol].isPreviousCell) {
                        newMazeCells[nRow][nCol].cssClassName = "square-previous-cell";
                    } else if (newMazeCells[nRow][nCol].isEntryPoint) {
                        newMazeCells[nRow][nCol].cssClassName = "square-entry-cell";
                    } else if (newMazeCells[nRow][nCol].isExitPoint) {
                        newMazeCells[nRow][nCol].cssClassName = "square-exit-cell";
                    } else if (newMazeCells[nRow][nCol].isEnterable) {
                        newMazeCells[nRow][nCol].cssClassName = "square-enterable";
                    } else if (newMazeCells[nRow][nCol].isPath) {
                        newMazeCells[nRow][nCol].cssClassName = "square-path";
                    } else {
                        newMazeCells[nRow][nCol].cssClassName = "square";
                    }
                }
            }
            setMakeAMazePath(newMakeAMazePath);
            drawPathOnMaze(newMazeCells, makeAMazePath);

            /// wrap up
            setMazeCells(newMazeCells);
        }
    }

    return (
        <>
            <IonGrid className="board">
                {

                    mazeCells.map((aRow: MakeAMazeCell[], rowIndex: number) => {
                        return <IonRow key={rowIndex} >
                            {
                                aRow.map((aCol: MakeAMazeCell, columnIndex: number) => {
                                    return (
                                        <IonCol className={mazeCells[rowIndex][columnIndex].cssClassName} key={rowIndex * 8 + columnIndex} onClick={() => onCellClicked(rowIndex, columnIndex)} >
                                            <IonImg className="path-in-svg" src={mazeCells[rowIndex][columnIndex].inImageSrc} />
                                            <IonImg className="path-out-svg" src={mazeCells[rowIndex][columnIndex].outImageSrc} />
                                            <IonImg className="path-in-trace-svg" src={mazeCells[rowIndex][columnIndex].inTraceImageSrc} />
                                            <IonImg className="path-out-trace-svg" src={mazeCells[rowIndex][columnIndex].outTraceImageSrc} />
                                            <IonLabel className="square-label">{mazeCells[rowIndex][columnIndex].displayString}</IonLabel>
                                        </IonCol>
                                    )
                                })
                            }
                        </IonRow>
                    })
                }

                <IonRow key="1000" className={step === Step.EnterMazeCreate ? "step-row-show" : "step-row-hide"}>
                    <IonCol size="12">
                        <h5 className="step-row-heading">Enter Maze</h5>
                        <p>Click on any dark green square along edge of maze to begin.</p>

                    </IonCol>
                </IonRow>
                <IonRow key="1001" className={step === Step.CreatePath ? "step-row-show  ion-align-items-center" : "step-row-hide   ion-align-items-center"}>
                    <IonCol size="12" className="ion-align-self-center">
                        <h5 className="step-row-heading">Creating Your Maze Path</h5>
                        <p>You can enter any DARK GREEN square. You are in the WHITE square</p>
                        <p className={canExitMaze ? "step-row-button-show" : "step-row-hide"}>To exit from any edge square click Done</p>
                        <IonButton
                            size="small"
                            className={canExitMaze ? "step-row-button-show ion-align-items-center" : "step-row-button-hide"}
                            onClick={() => { onExitButtonClick(); }}
                        > Done Creating Path - Exit the maze</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow key="1002" className={step === Step.ReviewCreatedPath ? "step-row-show ion-align-items-center" : "step-row-hide  ion-align-items-center"}>
                    <IonCol size="12" className="ion-align-self-center">
                        <h5 className="step-row-heading">Review the path you created</h5>
                        <p>Memorize it, you have XX seconds. YELLOW is entry point, WHITE is exit point</p>
                        <IonButton
                        size="small"
                            className={"step-row-button-show ion-align-items-center"}
                            onClick={() => { onReadyButtonClick(); }}
                        > Ready</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow key="1003" className={step === Step.EnterMazeTrace ? "step-row-show" : "step-row-hide"}>
                    <IonCol size="12">
                        <h5 className="step-row-heading">Re-Enter Maze</h5>
                        <p>Any dark green square along edge of maze</p>
                        <p>Try to recall which square you entered the first time</p>
                    </IonCol>
                </IonRow>
                <IonRow key="1004" className={step === Step.Retracing ? "step-row-show  ion-align-items-center" : "step-row-hide  ion-align-items-center"}>
                    <IonCol size="12">
                        <h5 className="step-row-heading">Re-tracing Maze</h5>
                        <p>Any dark green square along edge of maze. Try to recall which square you entered next from here</p>
                        <p className={canExitMaze ? "step-row-show" : "step-row-hide"}>You can exit from any edge square</p>
                        <IonButton
                        size="small"
                            className={canExitMaze ? "step-row-button-show ion-align-items-center" : "step-row-button-hide "}
                            onClick={() => { onDoneTrackingPathButtonClick(); }}
                        > Done Tracing Path - Exit the maze</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow key="1005" className={step === Step.ResultsPlayAgain ? "step-row-show ion-align-items-center" : "step-row-hide ion-align-items-center"}>
                    <IonCol size="12"  className="ion-align-self-center">
                        <h5  className="step-row-heading">Results</h5>
                        <p>First Path (brown) steps: {madeAMazePath.length}, turns: {step === Step.ResultsPlayAgain ? numberOfTurns(madeAMazePath) : '-'}</p>
                        <p>Second Path (orange) steps: {makeAMazePath.length}, turns: {step === Step.ResultsPlayAgain ? numberOfTurns(makeAMazePath) : '-'}</p>
                        <p>Matching Steps {numberOfMatchingSteps()} out of {madeAMazePath.length} </p>
                        <IonButton
                        size="small"
                            className={"step-row-button-show  ion-align-items-center"}
                            onClick={() => { OnPlayAgain(); }}
                        > Play Again?</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid >
        </>
    )
}

export default MakeAMaze;