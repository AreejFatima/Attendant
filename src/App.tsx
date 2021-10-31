import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";
import Navbar from "./Components/Shared/NavBar";
import Routes from "./Routing/Routes";
import ErrorBoundary from "./Components/Shared/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ErrorBoundary>
          <Navbar />
          <Routes />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
