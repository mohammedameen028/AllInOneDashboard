import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import  WeatherConditions  from "./Components/WeatherConditions";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/WeatherConditions"
            component={WeatherConditions}
          ></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
