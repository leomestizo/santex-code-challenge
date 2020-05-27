import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import difficultyLevels from 'constants/difficultyLevels';

import { actions } from '../slice';
import { getGameBoard } from '../selectors';

import GameBoardRow from './GameBoardRow';
import styles from './gameBoard.scss';

const propTypes = {
  difficultyLevel: PropTypes.oneOf(difficultyLevels).isRequired,
};

const renderRow = (row, index) => <GameBoardRow key={index} row={row} />;

const GameBoard = ({ difficultyLevel }) => {
  const dispatch = useDispatch();
  const gameBoard = useSelector(getGameBoard);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(actions.initialize({ difficultyLevel }));
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className={styles['game-board']}>
      {gameBoard.map(renderRow)}
    </div>
  );
};

GameBoard.propTypes = propTypes;

export default GameBoard;
