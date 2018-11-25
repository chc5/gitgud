import React, { Component } from 'react';
import { connect } from 'react-redux';

import { notification } from 'antd';

class Notice extends Component{
  constructor(props){
    super(props);
    this.state = { visible: true }
  }
  componentDidUpdate(prevProps){
    if(this.props.notification !== prevProps.notification){
      const args = {
        message: this.props.notification,
        duration: 1.5,
        placement: 'bottomRight'
      };
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

export default connect(mapStateToProps) (Notice);
