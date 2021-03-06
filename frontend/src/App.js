import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

// all the pages and nav bar 
import NavBar from "./NavBar/NavBar"
import Loading from "./Shared/components/Loading"
import PrivateRoute from "./Route/PrivateRoute"
import LoginRoute from "./Route/LoginRoute"
import 'bootstrap/dist/css/bootstrap.min.css';


// all Pages
const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"))
const MovieDownloads = React.lazy(() => import("./MovieDownloads/MovieDownloads"))
const DayDownloads = React.lazy(() => import("./MovieDownloads/DayDownloads"))
const MoviePublish = React.lazy(() => import("./MoviePublish/MoviePublish"))
const CreateAccount = React.lazy(() => import("./CreateAccount/CreateAccount"))
const Login = React.lazy(() => import("./Login/Login"))

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <Router>
      {user && <NavBar />}
      <Suspense fallback={<Loading />}>
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/downloads/:dayId" exact component={DayDownloads} />
          <PrivateRoute path="/downloads" exact component={MovieDownloads} />
          <PrivateRoute path="/publish" exact component={MoviePublish} />
          <PrivateRoute path="/user" exact component={CreateAccount} />
          <LoginRoute path="/login" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
