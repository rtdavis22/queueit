import PropTypes from 'prop-types';
import React, {useState} from 'react';

import QueueItAPI from './QueueItAPI';

function TempBar(props) {
  const [tweetUrlText, setTweetUrlText] = useState('');

  if (props.queueConfig === null) {
    return null;
  }

  function submitItem() {
    QueueItAPI.CreateTweetQueueItem(props.queueConfig.getId(), tweetUrlText);
  }

  return (
    <div>
      <h1>{props.queueConfig.getName()}</h1>
      <input
        type="text"
        value={tweetUrlText}
        onChange={e => setTweetUrlText(e.target.value)}
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
