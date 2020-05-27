import { actions } from './slice';

export const updateDifficultyLevelThunk = (difficultyLevel) => (dispatch) => {
  dispatch(actions.setDifficultyLevel({ difficultyLevel }));

  return Promise.resolve();
};

export const updateLevelAndResetThunk = (difficultyLevel) => (dispatch) => {
  dispatch(updateDifficultyLevelThunk(difficultyLevel)).then(() => {
    dispatch(actions.resetGame());
  });
};
