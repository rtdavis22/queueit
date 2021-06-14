import React from 'react';

import './App.css';
import Main from './Main.js';

const {EchoRequest, EchoResponse} = require('./gen/idl/echo_pb.js');
const {EchoClient} = require('./gen/idl/echo_grpc_web_pb.js');


function App() {
  var echoService = new EchoClient('http://localhost:8080');

  var request = new EchoRequest();
  request.setMessage('Hello World!');

  echoService.echo(request, {}, function(err, response) {
    console.log('Response', response);
    console.log('Error', err);
  });

  // stream request
  var streamRequest = new EchoRequest();
  streamRequest.setMessage('STREAM');

  var stream = echoService.echoStream(streamRequest, {});
  stream.on('data', (response) => {
    console.log(response.getMessage());
   });
  stream.on('error', (err) => {
    console.log(`Unexpected stream error: code = ${err.code}` +
                `, message = "${err.message}"`);
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

export default App;
