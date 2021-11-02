import { Router, Switch, Route, useHistory } from "react-router-dom";
import adminDashboardPage from "../Pages/adminDashboardPage";
import adminLoginPage from "../Pages/adminLoginPage";
import adminSettingsPage from "../Pages/adminSettingsPage";
import userDashboardPage from "../Pages/userDashboardPage";
import userLeavePage from "../Pages/userLeavePage";
import userRegisterPage from "../Pages/userRegisterPage";
import userLoginPage from "../Pages/userLoginPage";
import userRecordsPage from "../Pages/userRecordsPage";
import UserProfilePage from "../Pages/userProfilePage";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  const history = useHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={userLoginPage} />
        <Route path="/Register" component={userRegisterPage} />
        <PrivateRoute
          path="/UserDashboard"
          component={userDashboardPage}
          redirected=""
        />
        <PrivateRoute
          path="/UserRecords"
          component={userRecordsPage}
          redirected=""
        />
        <PrivateRoute
          path="/LeaveRequest"
          component={userLeavePage}
          redirected=""
        />
        <PrivateRoute
          path="/UserProfile"
          component={UserProfilePage}
          redirected=""
        />
        <Route path="/AdminLogin" component={adminLoginPage} />
        <PrivateRoute
          path="/AdminDashboard"
          component={adminDashboardPage}
          redirected="AdminLogin"
        />
        <PrivateRoute
          path="/AdminSettings"
          component={adminSettingsPage}
          redirected="AdminLogin"
        />
      </Switch>
    </Router>
  );
};

export default Routes;
