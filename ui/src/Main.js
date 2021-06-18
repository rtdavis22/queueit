import React from 'react';

import {QueueConfigType} from './Types';

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
  queueConfig: QueueConfigType,
};

export default Main;
