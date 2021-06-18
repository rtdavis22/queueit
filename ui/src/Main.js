import PropTypes from 'prop-types';
import React from 'react';

function Main(props) {
  if (props.queueConfig === null) {
    return null;
  }
  return (
    <div>
      <h1>{props.queueConfig.getName()}</h1>
    </div>
  );
}

Main.propTypes = {
  queueConfig: PropTypes.any,
};

export default Main;
