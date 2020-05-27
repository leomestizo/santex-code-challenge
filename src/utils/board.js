import { random } from 'lodash-es';

export const getNumberOfRows = (board) => board.length;

export const getNumberOfColumns = (board) => board[0].length;

export const getRandomRowIndex = (numberOfRows) => {
  const maximumRowIndex = numberOfRows - 1;

  return random(maximumRowIndex);
};

export const getRandomColumnIndex = (numberOfColumns) => {
  const maximumColumnIndex = numberOfColumns - 1;

  return random(maximumColumnIndex);
};

export const getRandomRowIndexFromBoard = (board) => {
  const numberOfRows = getNumberOfRows(board);

  return getRandomRowIndex(numberOfRows);
};

export const getRandomColumnIndexFromBoard = (board) => {
  const numberOfColumns = getNumberOfColumns(board);

  return getRandomColumnIndex(numberOfColumns);
};
