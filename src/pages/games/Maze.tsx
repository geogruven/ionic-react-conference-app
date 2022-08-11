import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonImg,
  IonLabel,
  IonButtons,
  IonAlert,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillLeave,
  useIonViewDidLeave,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import "./Maze.scss";
import { MazeCell } from "../../models/games/MazeCell";
import {
  Game,
  MazeStep,
  MazeCellLocation,
} from "../../data/game-center/game.center.state";
import { connect } from "../../data/connect";
import {
  setCurrentCell,
  setCurrentGameStep,
  setMazeCellRssi,
  setCurrentGame,
  heartbeat,
} from "../../data/game-center/game.center.actions";

//import { BleClient, ScanMode } from "@capacitor-community/bluetooth-le";
import { MazeBeacon } from "../../models/games/MazeBeacon";
// import { platform } from 'os';

interface OwnProps extends RouteComponentProps {}
interface StateProps {
  currentGame: Game;
  beacons: MazeBeacon[];
}
interface DispatchProps {
  setCurrentGameStep: typeof setCurrentGameStep;
  setCurrentCell: typeof setCurrentCell;
  setMazeCellRssi: typeof setMazeCellRssi;
  setCurrentGame: typeof setCurrentGame;
  heartbeat: typeof heartbeat;
}
interface MazeProps extends OwnProps, StateProps, DispatchProps {}

const Maze: React.FC<MazeProps> = ({
  currentGame,
  beacons,
  setCurrentGameStep,
  setCurrentCell,
  setMazeCellRssi,
  heartbeat,
  setCurrentGame,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  var scanBeacons: boolean;
  // var beaconsInitialized: boolean;
  // var staleRssiScanner: NodeJS.Timeout;

  useEffect(() => {
    if (currentGame.mazePath.length === 0) {
      setCurrentGameStep(MazeStep.EnterMazeCreate);
    } else {
      setCurrentGameStep(MazeStep.ReviewCreatedPath);
    }
    // eslint-disable-next-line
  }, [currentGame.id]);

  useIonViewWillLeave(() => {
    if (scanBeacons) {
      stopBeacons();
    }
  });

  useIonViewDidLeave(() => {
    setCurrentGame(0);
  });

/*  async function startBeacons(): Promise<void> {

    try {
      if (beaconsInitialized === undefined || beaconsInitialized === false) {
        await BleClient.initialize();
        beaconsInitialized = true;
      }
      scanBeacons = true;
      staleRssiScanner = setInterval(function () {
        console.log(`>>>> Interval: calling heartbeat()`);
        heartbeat();
      }, 750);
      await BleClient.requestLEScan(
        {
          services: ["00002080-0000-1000-8000-00805f9b34fb"], // TODO: removed for android test, probably needed for iOS and Android?
          allowDuplicates: true,
          scanMode: ScanMode.SCAN_MODE_LOW_LATENCY, // TODO: added for Android, test with iOS
        },
        (result) => {
          console.log(
            `>>> BleClient.requestLEScan: received new scan result ${result}`
          );
          processMazeBeacon(result.device.deviceId, result.rssi);
        }
      ).catch();
    } catch (error) {
      console.log(`>>>ERROR  BleClient.initialize() called: result: ${error}`);
    }
  }
  */
  /*
  async function processMazeBeacon(deviceId: string, rssi: number) {
    let beacon = beacons.find(function (beacon) {
      return beacon.id === deviceId;
    });
    if (beacon !== undefined) {
      setMazeCellRssi(beacon.row, beacon.col, rssi);
    } else {
      console.log(
        `>>> ERROR: shouldn't happen, can't find beacon id: ${deviceId}`
      );
    }
  }
*/
  async function stopBeacons(): Promise<void> {
    /*
    scanBeacons = false;
    clearInterval(staleRssiScanner);
    await BleClient.stopLEScan();
    */
    console.log(`>>> stopped scanning`);
  }

  const onReadyButtonClick = () => {
    setCurrentGameStep(MazeStep.EnterMazeTrace);
    // startBeacons();
  };

  const onExitButtonClick = () => {
    setCurrentGameStep(MazeStep.EnterMazeTrace);
    // startBeacons();
  };

  const onDoneTrackingPathButtonClick = () => {
    // stopBeacons();
    setCurrentGameStep(MazeStep.ResultsPlayAgain);
  };

  const OnPlayAgain = () => {
    if (currentGame.mazePath.length === 0) {
      setCurrentGameStep(MazeStep.EnterMazeCreate);
    } else {
      setCurrentGameStep(MazeStep.ReviewCreatedPath);
    }
  };

  const onCellClicked = (row: number, col: number) => {
    let location: MazeCellLocation = { row: row, column: col };
    setCurrentCell(location);
  };

  return (
    <IonPage id="make-a-maze-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{currentGame.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonGrid fixed>
          {currentGame.mazeCells.map((aRow: MazeCell[], rowIndex: number) => {
            return (
              <IonRow key={rowIndex}>
                {aRow.map((aCol: MazeCell, columnIndex: number) => {
                  return (
                    <IonCol
                      className={
                        currentGame.mazeCells[rowIndex][columnIndex]
                          .cssClassName
                      }
                      key={rowIndex * 8 + columnIndex}
                      onClick={() => onCellClicked(rowIndex, columnIndex)}
                    >
                      <IonImg
                        className="path-in-svg"
                        src={
                          currentGame.mazeCells[rowIndex][columnIndex]
                            .inImageSrc
                        }
                      />
                      <IonImg
                        className="path-out-svg"
                        src={
                          currentGame.mazeCells[rowIndex][columnIndex]
                            .outImageSrc
                        }
                      />
                      <IonImg
                        className="path-in-trace-svg"
                        src={
                          currentGame.mazeCells[rowIndex][columnIndex]
                            .inTraceImageSrc
                        }
                      />
                      <IonImg
                        className="path-out-trace-svg"
                        src={
                          currentGame.mazeCells[rowIndex][columnIndex]
                            .outTraceImageSrc
                        }
                      />
                      <IonLabel className="square-label">
                        {currentGame.mazeCells[rowIndex][columnIndex].rssi ===
                        -127
                          ? ""
                          : currentGame.mazeCells[rowIndex][columnIndex].rssi}
                      </IonLabel>
                    </IonCol>
                  );
                })}
              </IonRow>
            );
          })}
          <IonRow
            key="1000"
            className={
              currentGame.gameStep === MazeStep.EnterMazeCreate
                ? "step-row-show"
                : "step-row-hide"
            }
          >
            <IonCol size="12">
              <h3>Enter Maze to create your own path</h3>
              <p>Click on any dark green square along edge of maze to begin.</p>
            </IonCol>
          </IonRow>
          <IonRow
            key="1001"
            className={
              currentGame.gameStep === MazeStep.CreatePath
                ? "step-row-show"
                : "step-row-hide"
            }
          >
            <IonCol size="12">
              <h3>Creating Your Maze Path</h3>
              <p>You can enter any DARK GREEN square</p>
              <p>You are in the WHITE square</p>
              <p
                className={
                  currentGame.canExitMaze ? "step-row-show" : "step-row-hide"
                }
              >
                You can exit from any edge square by clicking this button:
              </p>
              <IonButton
                className={
                  currentGame.canExitMaze ? "step-row-show" : "step-row-hide"
                }
                onClick={() => {
                  onExitButtonClick();
                }}
              >
                {" "}
                Done Creating Path - Exit the maze
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow
            key="1002"
            className={
              currentGame.gameStep === MazeStep.ReviewCreatedPath
                ? "step-row-show"
                : "step-row-hide"
            }
          >
            <IonCol size="12">
              <h3>Memorize this path thru the Maze</h3>
              <IonButton
                className={"step-row-show"}
                onClick={() => {
                  onReadyButtonClick();
                }}
              >
                {" "}
                Ready
              </IonButton>
              <p>Press Ready Button when ready to retrace this path.</p>
              <p>YELLOW Square is entry point, WHITE square is exit point</p>
              <p>Dark Green squares can be clicked on to enter</p>
              <p>You can go back one step at a time if desired</p>
            </IonCol>
          </IonRow>
          <IonRow
            key="1003"
            className={
              currentGame.gameStep === MazeStep.EnterMazeTrace
                ? "step-row-show"
                : "step-row-hide"
            }
          >
            <IonCol size="12">
              <h3>Enter Maze to retrace the path</h3>
              <p>Any Dark Green square along edge of maze</p>
            </IonCol>
          </IonRow>
          <IonRow
            key="1004"
            className={
              currentGame.gameStep === MazeStep.Retracing
                ? "step-row-show"
                : "step-row-hide"
            }
          >
            <IonCol size="12">
              <h3>Re-tracing path thru the Maze</h3>
              <IonButton
                className={
                  currentGame.canExitMaze ? "step-row-show" : "step-row-hide"
                }
                onClick={() => {
                  onDoneTrackingPathButtonClick();
                }}
              >
                {" "}
                Done Tracing Path - Exit the maze
              </IonButton>
              <p
                className={
                  currentGame.canExitMaze ? "step-row-show" : "step-row-hide"
                }
              >
                You can exit the Maze from any edge square (Dark Green squares
                can be entered)
              </p>
              <p>Try to recall which square you entered next from here</p>
            </IonCol>
          </IonRow>
          <IonRow
            key="1005"
            className={
              currentGame.gameStep === MazeStep.ResultsPlayAgain
                ? "step-row-show"
                : "step-row-hide"
            }
          >
            <IonCol size="12">
              <h3>Results</h3>
              <h4>First Path (brown)</h4>
              <p>
                Number of steps: {currentGame.numberOfStepsMaze} - Number of
                turns: {currentGame.numberOfTurnsMaze}
              </p>
              <h4>Second Path (orange)</h4>
              <p>
                Number of steps: {currentGame.numberOfStepsRetrace} - Number of
                turns: {currentGame.numberOfTurnsRetrace}
              </p>
              <h4>Matching Steps</h4>
              <p>
                {currentGame.matchingSteps} out of{" "}
                {currentGame.retracePathCells.length}{" "}
              </p>
              <p>SCORE: {Math.round(currentGame.score)}</p>
              <IonButton
                className={"step-row-show"}
                onClick={() => {
                  OnPlayAgain();
                }}
              >
                {" "}
                Play Again?
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass="maze-alert"
          header={"Confirm"}
          subHeader={"Exit Game"}
          message={"Are you sure?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: (blah) => {
                console.log("Confirm Cancel: blah");
              },
            },
            {
              text: "Okay",
              handler: () => {
                console.log("Confirm Okay");
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    currentGame: state.gameCenter.currentGame,
    beacons: state.gameCenter.beacons,
  }),
  mapDispatchToProps: {
    setCurrentGameStep,
    setCurrentCell,
    setMazeCellRssi,
    setCurrentGame,
    heartbeat,
  },
  component: /* withRouter ?? */ Maze,
});
