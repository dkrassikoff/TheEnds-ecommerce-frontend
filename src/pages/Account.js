import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

class Account extends Component {
  constructor(props) {
    super(props);

    // const { email } = this.context;

    this.state = {
      // email: '',
    };
  }

  render() {
    // const { email } = this.state;

    return (
      <AuthContext.Consumer>
        {
          (state) => {
            if (state.user) {
              return (
                <div>
                  welcome
                  {' '}
                  {`${state.user.email}`}
                </div>
              );
            }
            return (
              <Redirect to="/" />
            );
          }
        }
      </AuthContext.Consumer>
    );
  }
}

Account.contextType = AuthContext;

export default Account;
