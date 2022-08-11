import React, { useState } from 'react';
import {
  IonHeader, IonToolbar, IonContent, IonPage, IonMenuButton, IonTitle, IonButtons, IonList,
  IonLabel, IonItem, IonListHeader, IonThumbnail, IonImg, IonModal, IonButton
} from '@ionic/react';
import './Play.scss';
// import GameItem from '../components/GameItem';
import MakeAMaze from '../components/MakeAMaze';
import { MakeAMazeCell } from '../models/games/MakeAMaze/MakeAMazeCell';

interface PlayProps { }

const Play: React.FC<PlayProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const gamesData = [
    { id: 1, name: "Easter Maze", iconImg: "/assets/img/speakers/rabbit.jpg", isAvail: false },
    { id: 2, name: "A Maze Zing", iconImg: "/assets/img/speakers/duck.jpg", isAvail: false },
    { id: 3, name: "Extreme Maze", iconImg: "/assets/img/speakers/eagle.jpg", isAvail: false },
    { id: 4, name: "Make A Maze", iconImg: "/assets/img/make-a-maze.jpg", isAvail: true },
    { id: 5, name: "Halloween Maze", iconImg: "/assets/img/speakers/kitten.jpg", isAvail: false },
    { id: 6, name: "Raze Maze", iconImg: "/assets/img/speakers/elephant.jpg", isAvail: false },
    { id: 7, name: "Putt Putt Maze", iconImg: "/assets/img/speakers/iguana.jpg", isAvail: false }
  ]

  var tempMazeCells: MakeAMazeCell[][] = [];
  for (var r = 0; r < 8; r++ ) {
      tempMazeCells[r] = [];
      for ( var c = 0; c < 8; c++ ) {
          tempMazeCells[r][c] = new MakeAMazeCell(r,c,( r === 0 || r === 7 || c === 0 || c === 7) ? true : false);
      }
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
          {gamesData.map(({ id, name, iconImg, isAvail }) => {
            return (
              <IonItem key={id} disabled={!isAvail} button onClick={() => { setShowModal(isAvail) }}>
                <IonThumbnail slot="start">
                  <IonImg src={iconImg} />
                </IonThumbnail>
                <IonLabel>{name}</IonLabel>
              </IonItem>
            )
          })}
        </IonList>
        <p className="ion-text-center">Some games may not be available today.</p>
        <p className="ion-text-center">... more games added daily!</p>
        <IonModal isOpen={showModal} >
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>Make A Maze</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <MakeAMaze  nRows = {8} nCols = {8} makeAMazeCells =  {tempMazeCells } />
          <IonButton onClick={() => setShowModal(false)}> Return to Game Center</IonButton>
        </IonModal>
      </IonContent>
    </IonPage >
  );
};

export default React.memo(Play);