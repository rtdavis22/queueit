import React, {useEffect, useState} from 'react';

import Main from './Main';
import {QueueConfigRequest} from './gen/idl/queueit_pb';
import {QueueItClient} from './gen/idl/queueit_grpc_web_pb';

import './App.css';

export default function App() {
  const [queueConfigs, setQueueConfigs] = useState([]);
  const [activeQueueId, setActiveQueueId] = useState(null);

  useEffect(() => {
    // Move elsewhere
    const client = new QueueItClient('http://localhost:8080');

    const request = new QueueConfigRequest();
    request.setDomain('default');

    client.getQueueConfigs(request, {}, (_, response) => {
      setQueueConfigs(response.getConfigsList());
    });
  }, []);

  const nav = queueConfigs.map((config) => (
    <li key={config.getId()}>
      <button type="button" onClick={() => setActiveQueueId(config.getId())}>
        {config.getName()}
      </button>
    </li>
  ));

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
        <Main activeQueueId={activeQueueId} />
      </div>
      <div className="sidebar">
        Column 3
      </div>
    </div>
  );
}
