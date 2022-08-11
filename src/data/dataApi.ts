import { Plugins } from '@capacitor/core';

// Model
import {EmptyCurrentGame, Game} from '../models/GameCenter';
import { MazeBeacon } from '../models/games/MazeBeacon';
import { GamePlayed } from '../models/games/GamePlayed'

const { Storage } = Plugins;

// data URLs
const gameCenterUrl = '/assets/data/game-center.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const GAMES_PLAYED = 'gamesPlayed';

export const getGameCenterData = async () => {
  const response = await Promise.all([
    fetch(gameCenterUrl)]);
  const responseData = await response[0].json();
  const name:string = responseData.name;
  const loading = true;
  const beacons = responseData.beacons as MazeBeacon[];
  const games = responseData.games as Game[];
  const currentGame = EmptyCurrentGame;
  const response2 = await Promise.all([
    Storage.get({ key: GAMES_PLAYED})]);
  const gamesPlayedStr = await response2[0].value;
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
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME }),
    Storage.get({ key: GAMES_PLAYED})]);
  const isLoggedin = true; // await response[0].value === 'true';
  const hasSeenTutorial = true; // await response[1].value === 'true';
  const username = await response[2].value || "player";
  const data = {
    isLoggedin,
    hasSeenTutorial,
    username,
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

export const setGamesPlayedData = async (gamesPlayed:GamePlayed[]) => {
  await Storage.set({ key: GAMES_PLAYED, value: JSON.stringify(gamesPlayed)});
}
