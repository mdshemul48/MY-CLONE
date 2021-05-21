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
import { AuthContext } from "./shared/context/Auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
function App() {
  const { login, logout, userId, token } = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
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
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
