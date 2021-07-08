import React from "react";
import logo from "../logo.svg";
import "./App.css";
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Home from "../pages/home";
import { connect } from "react-redux";
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route component={() => <h1>Not found</h1>} />
                </Switch>
            </Router>
        );
    }
}
const mapStateToProps = (state) => ({
    posts: state.simpleReducer.post,
});

export default connect(mapStateToProps)(App);
