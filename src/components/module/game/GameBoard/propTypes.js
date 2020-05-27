import PropTypes from 'prop-types';

import cellStatusList from 'constants/cellStatus';

export const gameBoardCellPropTypes = PropTypes.shape({
  i: PropTypes.number,
  j: PropTypes.number,
  id: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  status: PropTypes.oneOf(cellStatusList),
});
