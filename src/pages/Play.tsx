import React, { useState } from 'react';
import {
  IonHeader, IonToolbar, IonContent, IonPage, IonMenuButton, IonTitle, IonButtons, IonList,
  IonLabel, IonItem, IonListHeader, IonThumbnail, IonImg, IonModal, IonButton
} from '@ionic/react';
import './Play.scss';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { Game } from '../data/game-center/game.center.state';
import { setCurrentGame } from '../data/game-center/game.center.actions';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  games: Game[];
}
interface DispatchProps {
  setCurrentGame: typeof setCurrentGame;
}
interface PlayProps extends OwnProps, StateProps, DispatchProps { }

const Play: React.FC<PlayProps> = ({ history, games, setCurrentGame }) => {
  
  function playMazeGame(id: number) {
    setCurrentGame(id);

    history.push({
      pathname: '/games/maze',
    });
  }

  return (
    <IonPage id="home-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Play a Game</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonList>
          <IonListHeader>
            <IonLabel>Select a game to play</IonLabel>
          </IonListHeader>
            {games.map(({ id, name, iconImg, isAvail }) => {
              return (
                <IonItem key={id} disabled={!isAvail} button onClick={(evt) => playMazeGame(id)}>
                  <IonThumbnail slot="start">
                    <IonImg src={iconImg} />
                  </IonThumbnail>
                  <IonLabel>{name}</IonLabel>
                </IonItem>
              )
          })}
        </IonList>
      </IonContent>
    </IonPage >
  );
};


// export default React.memo(Play);
export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    games: state.gameCenter.games,
  }),
  mapDispatchToProps: ({
    setCurrentGame
  }),
  component: Play
})