import React from 'react';
import PropTypes from 'prop-types';

import DigitalCounter from 'components/common/DigitalCounter';

const propTypes = {
  numberOfMines: PropTypes.number.isRequired,
};

const MineCounter = ({ numberOfMines }) => (
  <div>
    <DigitalCounter number={numberOfMines} />
  </div>
);

MineCounter.propTypes = propTypes;

export default MineCounter;
