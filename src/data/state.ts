import { combineReducers } from './combineReducers';
import { gameCenterReducer } from './game-center/game.center.reducer';
import { userReducer } from './user/user.reducer';
// import { EmptyCurrentGame } from '../models/GameCenter';


/*
* initialState() returns AppState type
*/
export const initialState: AppState = {
  gameCenter: {
    id: 1,
    name: "Prototype One",
    byline: "React/Typescript/Ionic",
    banner: "",
    games: [],
    users: [],
    gamesPlayed: [],
    loading: false,
    menuEnabled: true
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false,
  }
};

export const reducers = combineReducers({
  gameCenter: gameCenterReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;