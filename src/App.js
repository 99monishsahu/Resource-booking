import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./booking.css";

import Booking from "./booking";
import ResourceList from "./resourcelist";
import AddResource from "./addresource";
import Calendar from "./calendar";

import tata from "./tata.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img
              src={tata}
              width="60"
              height="40"
              alt="CodingTheSmartWay.com"
            />
            &nbsp;&nbsp;
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">
                    List of Resources
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={AddResource} />
          <Route path="/list" component={ResourceList} />
          <Route path="/details/:id" component={Booking} />
          <Route path="/calendar/:id" component={Calendar} />
        </div>
      </Router>
    );
  }
}

export default App;
