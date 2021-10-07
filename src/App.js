import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";
import Navbar from "./Components/Shared/NavBar";
import Routes from "./Routing/Routes";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
