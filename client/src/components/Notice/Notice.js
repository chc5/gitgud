import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { notification } from 'antd';
import { resetNotification } from '../../actions/actions_notification';

class Notice extends Component{
  constructor(props){
    super(props);
    this.state = { visible: true }
  }
  componentDidUpdate(prevProps){
    if(this.props.notification){
      const args = {
        message: this.props.notification,
        duration: 1.5,
        placement: 'bottomRight'
      };
      this.props.resetNotification();
      notification.open(args);
    }
  }
  render(){
    return (
      <div>hello</div>
    );
  }
}



function mapStateToProps({ notification }){
  return { notification };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ resetNotification }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Notice);
