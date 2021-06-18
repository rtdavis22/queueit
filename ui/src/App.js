import React, {useEffect, useState} from 'react';

import Main from './Main';
import QueueItAPI from './QueueItAPI';
import TempBar from './TempBar';

import './App.css';

export default function App() {
  const [queueConfigs, setQueueConfigs] = useState({});
  const [activeQueueId, setActiveQueueId] = useState(null);

  useEffect(() => {
    const res = QueueItAPI.GetQueueConfigs();
    res.then(configList => {
      setQueueConfigs(configList.reduce((acc, cur) => {
        acc[cur.getId()] = cur;
        return acc;
      }, {}));
    }, () => {
      // TODO: log error
    });
  }, []);

  const nav = Object.keys(queueConfigs).map(id => (
    <li key={id}>
      <button type="button" onClick={() => setActiveQueueId(id)}>
        {queueConfigs[id].getName()}
      </button>
    </li>
  ));

  const activeQueueConfig = queueConfigs[activeQueueId] || null;

  return (
    <div className="App">
      <div className="sidebar">
        <nav>
          <ol>
            {nav}
          </ol>
        </nav>
      </div>
      <div className="main">
        <Main queueConfig={activeQueueConfig} />
      </div>
      <div className="sidebar">
        <TempBar queueConfig={activeQueueConfig} />
      </div>
    </div>
  );
}
