import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './textBox.scss';

const propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

const defaultProps = {
  autocomplete: 'off',
  className: '',
  isDisabled: false,
  maxLength: -1,
  minLength: -1,
  name: '',
  onChange: () => {},
  placeholder: '',
  value: '',
  error: '',
};

const TextBox = ({
  autocomplete,
  className,
  isDisabled,
  maxLength,
  minLength,
  name,
  onChange,
  placeholder,
  value,
  error,
}) => {
  const textBoxClasses = classnames(styles['text-box'], className, {
    [styles.disabled]: isDisabled,
    [styles['has-error']]: !!error,
  });

  return (
    <div className={styles['text-box-container']}>
      <input
        autoComplete={autocomplete}
        className={textBoxClasses}
        disabled={isDisabled}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
        title={error}
      />
      {error && <span className={styles['error-msg']}>{error}</span>}
    </div>
  );
};

TextBox.propTypes = propTypes;
TextBox.defaultProps = defaultProps;

export default TextBox;
