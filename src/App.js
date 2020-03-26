import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import  WeatherConditions  from "./Components/WeatherConditions";
import User from './Components/CaptureUser' 
import Covid19Status from "./Components/Covid19Status"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/WeatherConditions"
            component={WeatherConditions}></Route>
          <Route
            path="/Covid19"
            component={Covid19Status}></Route>
            <Route
            path="/User"
            component={User}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
