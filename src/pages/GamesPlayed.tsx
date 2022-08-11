import React from 'react';
import {
  IonHeader, IonToolbar, IonContent, IonPage, IonMenuButton, IonTitle, IonButtons, IonGrid, IonList, IonItem,
  IonLabel, IonImg, IonThumbnail
} from '@ionic/react';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { GamePlayed } from '../models/games/GamePlayed';
import './GamesPlayed.scss';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  gamesPlayed: GamePlayed[];
}
interface DispatchProps {
}
interface GamesPlayedProps extends OwnProps, StateProps, DispatchProps { }

const Played: React.FC<GamesPlayedProps> = ( gamesPlayed ) => {
  var index:number = 0;

  // const gamesPlayedData = [
  //   { id: 0, name: "Make A Maze", datePlayed: "1/21/2021", score: 67 },
  //   { id: 1, name: "Make A Maze", datePlayed: "1/22/2021", score: 68 },
  //   { id: 2, name: "Make A Maze", datePlayed: "1/23/2021", score: 66 },
  //   { id: 3, name: "Make A Maze", datePlayed: "1/24/2021", score: 62 },
  //   { id: 4, name: "Make A Maze", datePlayed: "1/25/2021", score: 67 },
  //   { id: 5, name: "Make A Maze", datePlayed: "1/26/2021", score: 69 },
  //   { id: 6, name: "Make A Maze", datePlayed: "1/27/2021", score: 71 },
  //   { id: 7, name: "Make A Maze", datePlayed: "1/28/2021", score: 72 },
  //   { id: 8, name: "Make A Maze", datePlayed: "1/29/2021", score: 70 },
  //   { id: 9, name: "Make A Maze", datePlayed: "1/30/2021", score: 77 },
  //   { id: 10, name: "Make A Maze", datePlayed: "1/31/2021", score: 74 }
  // ]


  return (
    <IonPage id="games-played-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Games Played</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonGrid fixed>
          <IonList>
            {gamesPlayed.gamesPlayed.map(({  name, datePlayed, score, iconImg }) => {
              return (
                <IonItem key={index++}>
                  <IonThumbnail slot="start">
                    <IonImg src={iconImg} />
                  </IonThumbnail>
                  <IonLabel><h2>{name}</h2><p>Played {datePlayed}</p><p>Score {score}</p></IonLabel>
                </IonItem>

              )
            })}
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

// export default React.memo(Played);

// export default React.memo(Play);
export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    gamesPlayed: state.gameCenter.gamesPlayed,
  }),
  mapDispatchToProps: ({

  }),
  component: Played
})