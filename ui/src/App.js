import React from 'react';

import './App.css';
import Main from './Main';

const {QueueConfigRequest} = require('./gen/idl/queueit_pb');
const {QueueItClient} = require('./gen/idl/queueit_grpc_web_pb');

export default function App() {
  const client = new QueueItClient('http://localhost:8080');

  const request = new QueueConfigRequest();
  request.setDomain('default');

  client.getQueueConfigs(request, {}, (err, response) => {
    response.getConfigsList().forEach((config) => {
      console.log(config.getId());
      console.log(config.getName());
    });
  });

  return (
    <div className="App">
      <div className="sidebar">
        Column 1
      </div>
      <div className="main">
        <Main />
      </div>
      <div className="sidebar">
        Column 3
      </div>
    </div>
  );
}
