import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// castom import here
import Dashboard from "./Dashboard/pages/Dashboard";
import Downloads from "./Download_History/pages/Downloads";
import Publisher from "./Publisher/pages/Publisher";
import CreateAccount from "./Create_User/pages/CreateAccount";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/downloads">
          <Downloads />
        </Route>
        <Route exact path="/publisher">
          <Publisher />
        </Route>
        <Route exect path="/create-user">
          <CreateAccount />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
