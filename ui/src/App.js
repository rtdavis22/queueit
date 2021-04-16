import './App.css';
import Main from './Main.js';

function App() {
  return (
    <div className="App">
      <div class="sidebar">
	  Column 1
      </div>
      <div class="main">
        <Main />
      </div>
      <div class="sidebar">
        Column 3
      </div>
    </div>
  );
}

export default App;
