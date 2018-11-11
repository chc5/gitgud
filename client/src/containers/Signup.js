import React, { Component } from 'react';
import { connect } from 'react-redux';

class Signup extends Component{
  render(){
    return(
      <div>
        Signup testing
      </div>
    );
  }
}

// mapStateToProps = null;
// mapDispatchToProps = null;

export default connect(null) (Signup);
