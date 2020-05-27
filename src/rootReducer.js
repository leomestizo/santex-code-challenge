import { combineReducers } from 'redux';

import { reducer as gameReducer } from 'components/module/game/slice';

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
