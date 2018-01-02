import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login as loginFromReducer, logout, signup } from '../redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Home extends Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.props.login({
      email: event.target.email.value,
      password: event.target.password.value
    });
  }

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.signup({
      email: event.target.email.value,
      password: event.target.password.value
    });
  }

  render () {
    return (
      <div className="home-container">
        <h2>Welcome to Boilermaker!</h2>
        <h4>Sample mapped users' emails/passwords from react-redux store below:</h4>
        <ul className="users-list">
          {
            this.props.users.map(user => {
              return (
                <li key={user.id}>
                  email:  {user.email}
                    <div>
                      password:  {user.password}
                    </div>
                    <div>
                      salt:  {user.salt}
                    </div>
                </li>
              );
            })
          }
        </ul>

        <h2>Currently logged in as:  {this.props.currentUser.email || 'guest'}</h2>

        <button onClick={this.props.logout}>LOGOUT</button>

        <form onSubmit={this.onLoginSubmit}>
          <div className="form-group">
            <div>login email</div>
            <input
              name="email"
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <div>login password</div>
            <input
              name="password"
              type="password"
              className="form-control"
              required
            />
          </div>
          <button type="submit">LOGIN</button>
        </form>

        <form onSubmit={this.onSignupSubmit}>
          <div className="form-group">
            <div>signup email</div>
            <input
              name="email"
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <div>signup password</div>
            <input
              name="password"
              type="password"
              className="form-control"
              required
            />
          </div>
          <button type="submit">SIGNUP</button>
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = storeState => {
  return {
    users: storeState.users,
    currentUser: storeState.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: credentials => dispatch(loginFromReducer(credentials, ownProps.history)),
  logout: () => dispatch(logout(ownProps.history)),
  signup: credentials => dispatch(signup(credentials, ownProps.history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
