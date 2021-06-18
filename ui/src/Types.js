import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const QueueConfigType = PropTypes.shape({
  getId: PropTypes.func.isRequired,
  getName: PropTypes.func.isRequired,
});
