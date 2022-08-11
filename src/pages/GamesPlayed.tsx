import React from 'react';
import {
  IonHeader, IonToolbar, IonContent, IonPage, IonMenuButton, IonTitle, IonButtons, IonGrid, IonList, IonItem,
  IonLabel, IonImg, IonThumbnail
} from '@ionic/react';
import './GamesPlayed.scss';
// import GameItem from '../components/GameItem';

interface PlayedProps { }

const Played: React.FC<PlayedProps> = () => {

  // const [name, setName] = useState("George");

  // const [tokens, setTokens] = useState(7);

  const gamesPlayedData = [
    { name: "Make A Maze", datePlayed: "1/21/2021", score: 67 },
    { name: "Make A Maze", datePlayed: "1/22/2021", score: 68 },
    { name: "Make A Maze", datePlayed: "1/23/2021", score: 66 },
    { name: "Make A Maze", datePlayed: "1/24/2021", score: 62 },
    { name: "Make A Maze", datePlayed: "1/25/2021", score: 67 },
    { name: "Make A Maze", datePlayed: "1/26/2021", score: 69 },
    { name: "Make A Maze", datePlayed: "1/27/2021", score: 71 },
    { name: "Make A Maze", datePlayed: "1/28/2021", score: 72 },
    { name: "Make A Maze", datePlayed: "1/29/2021", score: 70 },
    { name: "Make A Maze", datePlayed: "1/30/2021", score: 77 },
    { name: "Make A Maze", datePlayed: "1/31/2021", score: 74 }
  ]


  return (
    <IonPage id="home-page">
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
            {gamesPlayedData.map(({ name, datePlayed, score }) => {
              return (
                <IonItem>
                  <IonThumbnail slot="start">
                    <IonImg src="/assets/img/make-a-maze.jpg" />
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

export default React.memo(Played);