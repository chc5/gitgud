import React, { Component } from 'react';
import { connect } from 'react-redux';

class Document extends Component{
  render(){
    return(
      <div>
        Document testing
      </div>
    );
  }
}

// mapStateToProps = null;
// mapDispatchToProps = null;

export default connect(null) (Document);
