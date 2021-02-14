import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PageUsers from "./Containers/PageUsers";
import PagePosts from "./Containers/PagePosts";
import PagePostsDetail from "./Containers/PagePostsDetail";
import { homeLinkPage, postsLinkPage, postsDetailLinkPage } from "./Services/Utils";

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path={homeLinkPage}
              name="Home"
              render={(props) => <PageUsers {...props} />}
              exact
            />
            <Route
              path={postsLinkPage + "/:userId"}
              name="Posts"
              render={(props) => <PagePosts {...props} />}
              // exact
            />
            <Route
              path={postsDetailLinkPage + "/:postId"}
              name="Posts Detail"
              render={(props) => <PagePostsDetail {...props} />}
              // exact
            />

            <Route
              path=""
              name="404"
              render={() => (
                <div className="notfound">
                  404 ! <br /> Not found{" "}
                </div>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
