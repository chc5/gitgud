import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component{
  render(){
    return(
      <div>
        Home Testing
      </div>
    );
  }
}

// mapStateToProps = null;
// mapDispatchToProps = null;

export default connect(null) (Home);
