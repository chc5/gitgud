import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import Document from "./containers/Document";
import DocumentManager from "./containers/DocumentManager";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import createHistory from "history/createBrowserHistory";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.history = createHistory();
  }

  render() {
    return (
      <div className="App">
        <Router history={this.history}>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/docs/:id" component={Document} />
              <Route path="/docs" component={DocumentManager} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
