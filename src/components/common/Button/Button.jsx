import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { BUTTON, RESET, SUBMIT } from 'constants/buttonTypes';

import styles from './button.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([BUTTON, RESET, SUBMIT]),
};

const defaultProps = {
  className: '',
  isDisabled: false,
  onClick: () => {},
  type: BUTTON,
};

const handleClick = (onClick, isDisabled) => {
  if (!isDisabled) {
    onClick();
  }
};

const Button = ({
  children,
  className,
  isDisabled,
  onClick,
  type,
}) => {
  const buttonClasses = classnames(styles.button, className, {
    [styles.disabled]: isDisabled,
  });

  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      onClick={() => handleClick(onClick, isDisabled)}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
