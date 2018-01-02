import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';

// IMPORT ROUTE COMPONENTS HERE:
import Home from './Home';

// IMPORT FETCH REDUCER FUNCTIONS HERE:
import { fetchUsers } from '../redux/users';
import { fetchCurrentUser } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }

  render () {
    return (
      <Router>
        <div id="main" className="root-container">
          BOILERMAKER
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialData: () => {
      dispatch(fetchUsers());
      dispatch(fetchCurrentUser());
    }
  };
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);

export default RootContainer;
