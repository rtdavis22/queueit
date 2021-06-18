import React, {useEffect, useState} from 'react';

import QueueItAPI from './QueueItAPI';
import {QueueConfigType} from './Types';

function Main(props) {
  const [activeQueueItemId, setActiveQueueItemId] = useState(null);
  const [queueItems, setQueueItems] = useState(null);

  useEffect(() => {
    if (props.queueConfig !== null) {
      QueueItAPI.GetTweetQueueItems(props.queueConfig.getId()).then(items => {
        setQueueItems(items);
        if (items.length > 0) {
          setActiveQueueItemId(0);
        }
      });
    }
  }, [props.queueConfig]);

  if (props.queueConfig === null) {
    return null;
  }

  let item = null;
  if (activeQueueItemId !== null) {
    item = queueItems[activeQueueItemId].getTweetUrl();
  }

  return (
    <div>
      <h1>{props.queueConfig.getName()}</h1>
      <button
        type="button"
        onClick={() => setActiveQueueItemId(activeQueueItemId - 1)}
        disabled={activeQueueItemId === null || activeQueueItemId === 0}>
        Previous
      </button>
      <button
        type="button"
        onClick={() => setActiveQueueItemId(activeQueueItemId + 1)}
        disabled={activeQueueItemId === null || activeQueueItemId === queueItems.length - 1}>
        Next
      </button>
      <p>{item}</p>
    </div>
  );
}

Main.propTypes = {
  queueConfig: QueueConfigType,
};

export default Main;
