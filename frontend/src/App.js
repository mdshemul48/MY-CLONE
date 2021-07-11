import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

// all the pages and nav bar 
import NavBar from "./NavBar/NavBar"
import dashboard from "./Dashboard/Dashboard"
import MovieDownloads from "./MovieDownloads/MovieDownloads"
import MoviePublish from "./MoviePublish/MoviePublish"
import CreateAccount from "./CreateAccount/CreateAccount"
import DayDownloads from "./MovieDownloads/DayDownloads"
import Login from "./Login/Login"

import PrivateRoute from "./Route/PrivateRoute"
import LoginRoute from "./Route/LoginRoute"

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    <Router>
      {user && <NavBar />}
      <Switch>
        <PrivateRoute path="/" exact component={dashboard} />
        <PrivateRoute path="/downloads/:dayId" exact component={DayDownloads} />
        <PrivateRoute path="/downloads" exact component={MovieDownloads} />
        <PrivateRoute path="/publish" exact component={MoviePublish} />
        <PrivateRoute path="/user" exact component={CreateAccount} />
        <LoginRoute path="/login" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
