import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { hasMine } from 'utils/cell';
import { COVERED, UNCOVERED, FLAGGED } from 'constants/cellStatus';
import { GAME_OVER, WON_GAME } from 'constants/gameStatus';

import { gameBoardCellPropTypes } from '../propTypes';

import { actions } from '../../slice';
import { getGameStatus, getCurrentCell } from '../../selectors';

import styles from './gameBoardCell.scss';

const propTypes = {
  cell: gameBoardCellPropTypes.isRequired,
};

export const CELL_SIZE = 24;

const getGameBoardCellClasses = (cell, gameStatus, currentCell) => classnames(styles['game-board-cell'], {
  [styles.covered]: cell.status === COVERED,
  [styles.flagged]: cell.status === FLAGGED,
  [styles['wrong-flag']]: gameStatus === GAME_OVER && cell.status === FLAGGED && !hasMine(cell),
  [styles.mine]: hasMine(cell) && cell.status === UNCOVERED,
  [styles.exploded]: gameStatus === GAME_OVER && cell.id === currentCell.id,
  [styles['zero-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 0,
  [styles['one-adjacent-mine']]: cell.status === UNCOVERED && cell.content === 1,
  [styles['two-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 2,
  [styles['three-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 3,
  [styles['four-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 4,
  [styles['five-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 5,
  [styles['six-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 6,
  [styles['seven-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 7,
  [styles['eight-adjacent-mines']]: cell.status === UNCOVERED && cell.content === 8,
});

const isActionable = (gameStatus) => gameStatus !== GAME_OVER && gameStatus !== WON_GAME;

const handleClick = (gameStatus, dispatch, cell) => {
  if (isActionable(gameStatus) && cell.status !== FLAGGED) {
    dispatch(actions.clickCell({ cell }));
  }
};

const handleContextMenu = (event, dispatch, cell, gameStatus) => {
  event.preventDefault();

  if (isActionable(gameStatus)) {
    dispatch(actions.toggleFlaggedCell({ cell }));
  }
};

const GameBoardCell = ({ cell }) => {
  const dispatch = useDispatch();
  const gameStatus = useSelector(getGameStatus);
  const currentCell = useSelector(getCurrentCell);

  return (
    <div
      style={{ width: CELL_SIZE, height: CELL_SIZE }}
      className={getGameBoardCellClasses(cell, gameStatus, currentCell)}
      onClick={() => handleClick(gameStatus, dispatch, cell)}
      onContextMenu={(event) => handleContextMenu(event, dispatch, cell, gameStatus)}
    />
  );
};

GameBoardCell.propTypes = propTypes;

export default GameBoardCell;
