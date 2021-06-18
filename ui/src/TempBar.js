import PropTypes from 'prop-types';
import React, {useState} from 'react';

import {CreateTweetQueueItemRequest} from './gen/idl/queueit_pb';
import {QueueItClient} from './gen/idl/queueit_grpc_web_pb';

function TempBar(props) {
  const [tweetUrlText, setTweetUrlText] = useState('');

  if (props.queueConfig === null) {
    return null;
  }

  function submitItem() {
    const client = new QueueItClient('http://localhost:8080');

    const request = new CreateTweetQueueItemRequest();
    request.setQueueId(props.queueConfig.getId());
    request.setTweetUrl(tweetUrlText);

    client.createTweetQueueItem(request);
  }

  return (
    <div>
      <h1>{props.queueConfig.getName()}</h1>
      <input
        type="text"
        value={tweetUrlText}
        onChange={(e) => setTweetUrlText(e.target.value)}
      />
      <button type="button" onClick={submitItem}>
        Submit
      </button>
    </div>
  );
}

TempBar.propTypes = {
  queueConfig: PropTypes.any,
};

export default TempBar;
