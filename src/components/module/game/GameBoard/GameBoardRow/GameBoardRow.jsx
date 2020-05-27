import React from 'react';
import PropTypes from 'prop-types';

import GameBoardCell from '../GameBoardCell';
import { gameBoardCellPropTypes } from '../propTypes';

import styles from './gameBoardRow.scss';

const propTypes = {
  row: PropTypes.arrayOf(gameBoardCellPropTypes),
};

const defaultProps = {
  row: [],
};

const renderCell = (cell) => (
  <GameBoardCell
    key={`cell-${cell.i}-${cell.j}`}
    cell={cell}
  />
);

const GameBoardRow = ({ row }) => (
  <div className={styles['game-board-row']}>
    {row.map(renderCell)}
  </div>
);

GameBoardRow.propTypes = propTypes;
GameBoardRow.defaultProps = defaultProps;

export default GameBoardRow;
