import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import DocComplaintManager from "./containers/DocComplaintManager/DocComplaintManager";
import Document from "./containers/Document/Document";
import DocumentManager from "./containers/DocumentManager/DocumentManager";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import ProfileManager from "./containers/ProfileManager/ProfileManager";
import PromotionManager from "./containers/PromotionManager/PromotionManager";
import Signup from "./containers/Signup/Signup";
import Setting from "./containers/Setting/Setting";
import TabooWordManager from "./containers/TabooWordManager/TabooWordManager";
import UserComplaintManager from "./containers/UserComplaintManager/UserComplaintManager";
import createHistory from "history/createBrowserHistory";
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
              <Route path="/complaints/user" component={UserComplaintManager} />
              <Route path="/complaints/doc" component={DocComplaintManager} />
              <Route path="/docs/:id" component={Document} />
              <Route path="/docs" component={DocumentManager} />
              <Route path="/promotion" component={PromotionManager} />
              <Route path="/login" component={Login} />
              <Route path="/profiles" component={ProfileManager} />
              <Route path="/setting" component={Setting} />
              <Route path="/signup" component={Signup} />
              <Route path="/taboos" component={TabooWordManager} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
