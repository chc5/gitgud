import React, { Component } from 'react';
import { connect } from 'react-redux';

class DocumentManager extends Component{
  render(){
    return(
      <div>
        Document Manager Testing
      </div>
    );
  }
}

// mapStateToProps = null;
// mapDispatchToProps = null;

export default connect(null) (DocumentManager);
