import React, {useEffect, useState} from 'react';

import Main from './Main';
import TempBar from './TempBar';
import {QueueConfigRequest} from './gen/idl/queueit_pb';
import {QueueItClient} from './gen/idl/queueit_grpc_web_pb';

import './App.css';

export default function App() {
  const [queueConfigs, setQueueConfigs] = useState({});
  const [activeQueueId, setActiveQueueId] = useState(null);

  useEffect(() => {
    // Move elsewhere
    const client = new QueueItClient('http://localhost:8080');

    const request = new QueueConfigRequest();
    request.setDomain('default');

    client.getQueueConfigs(request, {}, (_, response) => {
      setQueueConfigs(response.getConfigsList().reduce((acc, cur) => {
        acc[cur.getId()] = cur;
        return acc;
      }, {}));
    });
  }, []);

  const nav = Object.keys(queueConfigs).map((id) => (
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
