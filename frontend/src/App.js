import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

// castom import here
import MainNavigation from "./shared/components/navigation/MainNavigation";
import Dashboard from "./Dashboard/pages/Dashboard";
import Downloads from "./Download_History/pages/Downloads";
import Publisher from "./Publisher/pages/Publisher";
import CreateAccount from "./Create_User/pages/CreateAccount";
import DownloadHistory from "./Download_History/pages/DownloadsHistory";
import Login from "./login/page/Login";
import { AuthContext } from "./shared/context/Auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
const App = () => {
  const { login, logout, userId, token } = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
        <MainNavigation />
        <Switch>
          <Route path="/downloads/:dayId">
            <DownloadHistory />
          </Route>
          <Route path="/downloads">
            <Downloads />
          </Route>
          <Route path="/publisher">
            <Publisher />
          </Route>
          <Route path="/create-user">
            <CreateAccount />
          </Route>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
