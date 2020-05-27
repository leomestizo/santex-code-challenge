import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CUSTOM } from 'constants/difficultyLevels';
import { RUNNING } from 'constants/gameStatus';

import DifficultyLevelSelector from '../DifficultyLevelSelector';
import CustomLevelForm from '../CustomLevelForm';
import MineCounter from '../MineCounter';
import GameStatusIndicator from '../GameStatusIndicator';
import TimeCounter from '../TimeCounter';
import GameBoard from '../GameBoard';
import { CELL_SIZE } from '../GameBoard/GameBoardCell';
import { actions } from '../slice';
import { updateLevelAndResetThunk } from '../thunks';
import {
  getDifficultyLevel,
  getEllapsedTime,
  getGameStatus,
  getNumberOfColumns,
  getNumberOfMines,
  getNumberOfRows,
} from '../selectors';

import styles from './gameView.scss';

const GameView = () => {
  const dispatch = useDispatch();
  const gameStatus = useSelector(getGameStatus);
  const ellapsedTime = useSelector(getEllapsedTime);
  const numberOfMines = useSelector(getNumberOfMines);
  const numberOfRows = useSelector(getNumberOfRows);
  const numberOfColumns = useSelector(getNumberOfColumns);
  const difficultyLevel = useSelector(getDifficultyLevel);

  return (
    <div>
      <div>
        <DifficultyLevelSelector
          selectedLevel={difficultyLevel}
          onSelectLevel={(selectedDifficultyLevel) => {
            dispatch(updateLevelAndResetThunk(selectedDifficultyLevel));
          }}
        />
        {difficultyLevel === CUSTOM && (
          <CustomLevelForm
            numberOfMines={numberOfMines}
            numberOfRows={numberOfRows}
            numberOfColumns={numberOfColumns}
          />
        )}
      </div>
      <div className={styles.content} style={{ width: numberOfColumns * CELL_SIZE }}>
        <div className={styles['content-header']}>
          <MineCounter numberOfMines={numberOfMines} />
          <GameStatusIndicator
            gameStatus={gameStatus}
            onClick={() => dispatch(actions.resetGame())}
          />
          <TimeCounter
            startCounting={gameStatus === RUNNING}
            ellapsedTime={ellapsedTime}
          />
        </div>
        <div>
          <GameBoard difficultyLevel={difficultyLevel} />
        </div>
      </div>
    </div>
  );
};

export default GameView;
