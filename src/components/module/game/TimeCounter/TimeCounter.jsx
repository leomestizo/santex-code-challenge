import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import DigitalCounter from 'components/common/DigitalCounter';
import useInterval from 'hooks/useInterval';

import { actions } from '../slice';

const propTypes = {
  startCounting: PropTypes.bool,
  ellapsedTime: PropTypes.number,
};

const defaultProps = {
  startCounting: false,
  ellapsedTime: 0,
};

const TimeCounter = ({ startCounting, ellapsedTime }) => {
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch(actions.increaseTime(ellapsedTime + 1));
  }, startCounting ? 1000 : null);

  return (
    <div>
      <DigitalCounter number={ellapsedTime} />
    </div>
  );
};

TimeCounter.propTypes = propTypes;
TimeCounter.defaultProps = defaultProps;

export default TimeCounter;
