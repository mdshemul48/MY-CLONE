import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// castom import here
import MainNavigation from "./shared/components/navigation/MainNavigation";
import Dashboard from "./Dashboard/pages/Dashboard";
import Downloads from "./Download_History/pages/Downloads";
import Publisher from "./Publisher/pages/Publisher";
import CreateAccount from "./Create_User/pages/CreateAccount";
import DownloadHistory from "./Download_History/pages/DownloadsHistory";
function App() {
  return (
    <div className="full-body">
      <Router>
        <MainNavigation />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/downloads/:dayId">
            <DownloadHistory />
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
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
