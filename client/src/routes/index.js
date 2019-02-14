import { withRouter } from "react-router-dom";
import NotFound from './not-found';
import Dashboard from './dashboard';
import Login from './login';
import SignUp from './sing-up';
import User from './user';

export default {
  NotFound: withRouter(NotFound),
  Login: withRouter(Login),
  SignUp: withRouter(SignUp),
  User: withRouter(User),
  Dashboard: withRouter(Dashboard),
}