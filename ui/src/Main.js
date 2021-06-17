import PropTypes from 'prop-types';
import React from 'react';

function Main(props) {
  return (
    <div>
      <h1>{props.activeQueueId}</h1>
    </div>
  );
}

Main.propTypes = {
  activeQueueId: PropTypes.number,
};

export default Main;
