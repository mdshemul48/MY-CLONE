
import NavBar from "./NavBar/NavBar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <NavBar />
      <h1>hello world</h1>
    </Router>
  );
}

export default App;
