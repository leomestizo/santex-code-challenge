import { getNumberOfRows, getNumberOfColumns } from 'utils/board';
import { MINE } from 'constants/mine';

export const hasMine = (cell) => cell.content === MINE;

export const isCellValid = (i, j, numberOfRows, numberOfColumns) => (
  i >= 0 && i < numberOfRows && j >= 0 && j < numberOfColumns
);

export const getAdjacentCells = (gameBoard, cell) => {
  const adjacentCells = [];
  const numberOfRows = getNumberOfRows(gameBoard);
  const numberOfColumns = getNumberOfColumns(gameBoard);
  const { i, j } = cell;

  // Upper-left cell.
  if (isCellValid(i - 1, j - 1, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i - 1][j - 1]);
  }

  // Upper cell.
  if (isCellValid(i, j - 1, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i][j - 1]);
  }

  // Upper-right cell.
  if (isCellValid(i + 1, j - 1, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i + 1][j - 1]);
  }

  // Left cell.
  if (isCellValid(i - 1, j, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i - 1][j]);
  }

  // Right cell.
  if (isCellValid(i + 1, j, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i + 1][j]);
  }

  // Lower-left cell.
  if (isCellValid(i - 1, j + 1, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i - 1][j + 1]);
  }

  // Lower cell.
  if (isCellValid(i, j + 1, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i][j + 1]);
  }

  // Lower-right cell.
  if (isCellValid(i + 1, j + 1, numberOfRows, numberOfColumns)) {
    adjacentCells.push(gameBoard[i + 1][j + 1]);
  }

  return adjacentCells;
};

export const countAdjacentMines = (adjacentCells) => {
  let counter = 0;

  adjacentCells.forEach((adjacentCell) => {
    if (hasMine(adjacentCell)) {
      counter++;
    }
  });

  return counter;
};
