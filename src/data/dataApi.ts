// import { Plugins } from '@capacitor/core';

// Model
import {EmptyCurrentGame, Game} from '../models/GameCenter';
import { MazeBeacon } from '../models/games/MazeBeacon';
import { GamePlayed } from '../models/games/GamePlayed'

import { Storage } from '@ionic/storage';

// data URLs
const gameCenterUrl = '/assets/data/game-center.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const GAMES_PLAYED = 'gamesPlayed';

const myStore = new Storage();
myStore.create();

export const getGameCenterData = async () => {
  const response = await Promise.all([
    fetch(gameCenterUrl)]);
  const responseData = await response[0].json();
  const name:string = responseData.name;
  const loading = true;
  const beacons = responseData.beacons as MazeBeacon[];
  const games = responseData.games as Game[];
  const currentGame = EmptyCurrentGame;
  //const response2 = await Promise.all([
  // Storage.get({ key: GAMES_PLAYED})]);

  const gamesPlayedStr:string = await myStore.get('GAMES_PLAYED');
  const gamesPlayed:GamePlayed[] = gamesPlayedStr === null ? []: JSON.parse(gamesPlayedStr);
  const data = {
    name,
    loading,
    currentGame,
    beacons,
    games,
    gamesPlayed
  }

  return data;
}

export const getUserData = async () => {
  const isLoggedin = await myStore.get('HAS_LOGGED_IN');
  const hasSeenTutorial = await myStore.get('HAS_SEEN_TUTORIAL');
  const username = await myStore.get('USERNAME') || "player";
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await myStore.set(HAS_LOGGED_IN,  JSON.stringify(isLoggedIn) );
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await myStore.set(HAS_SEEN_TUTORIAL, JSON.stringify(hasSeenTutorial) );
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await myStore.remove(USERNAME );
  } else {
    await myStore.set(USERNAME, username );
  }
}

export const setGamesPlayedData = async (gamesPlayed:GamePlayed[]) => {
  await myStore.set(GAMES_PLAYED, JSON.stringify(gamesPlayed));
}
