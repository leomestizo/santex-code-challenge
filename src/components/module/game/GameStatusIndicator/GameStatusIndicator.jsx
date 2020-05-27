import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import gameStatusList, { GAME_OVER, WON_GAME } from 'constants/gameStatus';

import styles from './gameStatusIndicator.scss';

const propTypes = {
  gameStatus: PropTypes.oneOf(gameStatusList).isRequired,
  onClick: PropTypes.func.isRequired,
};

const getGameStatusIndicatorClasses = (isPressed, gameStatus) => (
  classnames(styles['game-status-indicator'], {
    [styles.pressed]: isPressed,
    [styles['game-over']]: gameStatus === GAME_OVER,
    [styles['won-game']]: gameStatus === WON_GAME,
  })
);

const GameStatusIndicator = ({ gameStatus, onClick }) => {
  const [isPressed, setIsPressedFlag] = useState(false);

  return (
    <div
      className={getGameStatusIndicatorClasses(isPressed, gameStatus)}
      onMouseDown={() => setIsPressedFlag(true)}
      onMouseUp={() => setIsPressedFlag(false)}
      onClick={onClick}
    />
  );
};

GameStatusIndicator.propTypes = propTypes;

export default GameStatusIndicator;
