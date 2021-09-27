import { Router, Switch, Route } from "react-router-dom";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import UserDashboard from "./Components/User/UserDashboard";
import UserRecords from "./Components/User/UserRecords";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminSettings from "./Components/Admin/AdminSettings";
import LeaveRequest from "./Components/User/LeaveRequest";
import history from "./history";

const Routes = () => ( <Router history={history}>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/UserDashboard" component={UserDashboard} />
            <Route path="/UserRecords" component={UserRecords} />
            <Route path="/AdminLogin" component={AdminLogin} />
            <Route path="/AdminDashboard" component={AdminDashboard} />
            <Route path="/AdminSettings" component={AdminSettings} />
            <Route path="/LeaveRequest" component={LeaveRequest} />
        </Switch>
    </Router> )
 
export default Routes;