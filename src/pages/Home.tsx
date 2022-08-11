import React, {useState} from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonMenuButton, IonTitle, IonButtons, IonButton, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './Home.scss';

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {

  const name="George";

  const [tokens,setTokens] = useState(7);


  return (
    <IonPage id="home-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My Game Center</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Welcome to</IonCardSubtitle>
            <IonCardTitle>BlueBeacon Game Center</IonCardTitle>
          </IonCardHeader>
          <img src="/assets/img/MazeExample.jpg" alt="hi" />
          <IonCardContent>
           <p>Above is an example of one of our games with 2 added inset pictures.  This example shows the Path (brown path) thru the maze that you'll want to memorize before you hit the ready button.  The Yellow Square is where you enter and the White Square is where you exit.  Try to follow the path as in the inset picture in the top right.  The current position is the White Square.  From there you can enter any adjacent Dark Green Square or back trace one step to the last Light Green square.  You can back trace all the way to the Yellow square where you entered if desired.  When you are done, you'll get a results page like the bottom left picture which, in this case, shows you traced the path successfully until the Orange path and Brown Paths diverge.</p>
            <p>Now, press the Play A Game button below and then select a game.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>

    </IonPage>
  );
};

export default React.memo(Home);