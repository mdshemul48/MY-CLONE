import { BrowserRouter as Router, Switch, Route } from "react-router-dom"


import NavBar from "./NavBar/NavBar"
import dashboard from "./Dashboard/Dashboard"
import MovieDownloads from "./MovieDownloads/MovieDownloads"
import MoviePublish from "./MoviePublish/MoviePublish"
import CreateAccount from "./CreateAccount/CreateAccount"
import DayDownloads from "./MovieDownloads/DayDownloads"
import Login from "./Login/Login"


import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={dashboard} />
        <Route path="/downloads/:dayId" exact component={DayDownloads} />
        <Route path="/downloads" exact component={MovieDownloads} />
        <Route path="/publish" exact component={MoviePublish} />
        <Route path="/user" exact component={CreateAccount} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
