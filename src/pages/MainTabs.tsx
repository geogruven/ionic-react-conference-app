import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { home, listOutline, settingsOutline, gameControllerOutline } from 'ionicons/icons';
import Home from './Home';
import Play from './Play';
import GamesPlayed from './GamesPlayed';
import About from './About';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/play" component={Play} exact={true}/>
        <Route path="/tabs/gamesplayed" component={GamesPlayed} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>My Game Center</IonLabel>
        </IonTabButton>
        <IonTabButton tab="play" href="/tabs/play">
          <IonIcon icon={gameControllerOutline} />
          <IonLabel>Play A Game</IonLabel>
        </IonTabButton>
        <IonTabButton tab="gamesplayed" href="/tabs/gamesplayed">
          <IonIcon icon={listOutline} />
          <IonLabel>Games Played</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={settingsOutline} />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;