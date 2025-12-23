//import logo from './logo.svg';
import './App.css';
import {BrowsePage} from './components/BrowsePage/BrowsePage.jsx'
import { restaurants } from './components/BrowsePage/RestaurantData.js';
 
function App() {
  return (
    <BrowsePage items={restaurants}/>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

