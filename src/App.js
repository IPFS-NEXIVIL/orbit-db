import logo from './logo.svg';
import './App.css';
import store from './store';
import { Store } from 'orbit-db';

function App() {
  await store.create()

  console.log("odb id:", store.odb.identity.id)

  return (
    <div className="App">
      <div><p>Peer ID</p></div>
      
    </div>
  );
}

export default App;
