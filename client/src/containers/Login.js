import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component{
  render(){
    return(
      <div>
        Login Testing
      </div>
    );
  }
}

// mapStateToProps = null;
// mapDispatchToProps = null;

export default connect(null) (Login);
