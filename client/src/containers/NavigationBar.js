import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { bindActionCreators } from 'redux';

// UI Imports
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

class NavigationBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: true
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render(){
    return(
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[]} mode="inline">
          <Menu.Item key="1" onClick={() => this.props.history.push(`/`)}>
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => this.props.history.push(`/docs`)}>
            <Icon type="file-search" />
            <span>Document List</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user" />
            <span>User Settings</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="setting" />
            <span>Setting</span>
          </Menu.Item>
          {!this.props.userInfo
            ? (
                <Menu.Item key="5" onClick={() => this.props.history.push(`/login`)}>
                <Icon type="login" />
                <span>Login</span>
                </Menu.Item>
              )
            : (
                <Menu.Item key="5">
                <Icon type="logout" />
                <span>Logout</span>
                </Menu.Item>
              )
          }
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps({ userInfo }){
  return { userInfo };
}
// mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps)(NavigationBar));
