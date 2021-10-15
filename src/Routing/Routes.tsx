import { Router, Switch, Route, useHistory } from "react-router-dom";
import adminDashboardPage from "../Pages/adminDashboardPage";
import adminLoginPage from "../Pages/adminLoginPage";
import adminSettingsPage from "../Pages/adminSettingsPage";
import userDashboardPage from "../Pages/userDashboardPage";
import userLeavePage from "../Pages/userLeavePage";
import userRegisterPage from "../Pages/userRegisterPage";
import userLoginPage from "../Pages/userLoginPage";
import userRecordsPage from "../Pages/userRecordsPage";

const Routes = () => {
  const history = useHistory();
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={userLoginPage} />
        <Route path="/Register" component={userRegisterPage} />
        <Route path="/UserDashboard" component={userDashboardPage} />
        <Route path="/UserRecords" component={userRecordsPage} />
        <Route path="/AdminLogin" component={adminLoginPage} />
        <Route path="/AdminDashboard" component={adminDashboardPage} />
        <Route path="/AdminSettings" component={adminSettingsPage} />
        <Route path="/LeaveRequest" component={userLeavePage} />
      </Switch>
    </Router>
  );
};

export default Routes;
