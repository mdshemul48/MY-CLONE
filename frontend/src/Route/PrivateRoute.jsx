import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <Route path={props.path} component={props.component} exact />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
