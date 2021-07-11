import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const LoginRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <Redirect to="/" />
  ) : (
    <Route path={props.path} component={props.component} exact />
  );
};

export default LoginRoute;
