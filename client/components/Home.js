import React, { Component } from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sample: ''
    };
  }

  render () {
    return (
      <div className="home-container">
        <h2>Welcome to Boilermaker!</h2>
        <h4>Sample mapped users' emails from react-redux store below:</h4>
        <ul className="users-list">
          {
            this.props.users.map(user => {
              return (
                <li key={user.id}>
                  {user.email}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = storeState => {
  return {
    users: storeState.users
  };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
