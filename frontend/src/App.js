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
import Login from "./login/page/Login";
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
          <Route exact path="/create-user">
            <CreateAccount />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
