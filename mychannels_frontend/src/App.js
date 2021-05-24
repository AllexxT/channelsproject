import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Hallway from "./Hallway";
import Room from "./Room";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          <Route exact path="/">
            <Hallway />
          </Route>
          <Route path="/*">
            <Room />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
