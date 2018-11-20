import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/actions_account_registration';
import { updateNavKey, updateNavCollapse }
  from '../actions/actions_navigation_bar';

// UI Imports
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

class NavBar extends Component{
  render(){
    return(
      <Sider
        collapsible
        collapsed={this.props.navigationBar.collapsed}
        onCollapse={this.props.updateNavCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={this.props.navigationBar.key} mode="inline">
          <Menu.Item
            key="1"
            onClick={() => {
              this.props.history.push(`/`);
              this.props.updateNavKey("1");
            }}
            >
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              this.props.history.push(`/docs`);
              this.props.updateNavKey("2");
            }}
            >
            <Icon type="file-search" />
            <span>Document List</span>
          </Menu.Item>
          <Menu.Item
            key="3"
            >
            <Icon type="user" />
            <span>User Settings</span>
          </Menu.Item>
          <Menu.Item
            key="4"
            >
            <Icon type="setting" />
            <span>Setting</span>
          </Menu.Item>
          {!this.props.userInfo
            ? (
                <Menu.Item
                  key="5"
                  onClick={() => {
                    this.props.history.push(`/login`);
                    this.props.updateNavKey("5");
                  }}
                  >
                  <Icon type="login" />
                  <span>Login</span>
                </Menu.Item>
              )
            : (
                <Menu.Item
                  key="6"
                  onClick={() => {
                    this.props.logout(this.props.history)
                    this.props.updateNavKey("6");
                  }}
                  >
                  <Icon type="logout" />
                  <span>Logout</span>
                </Menu.Item>
              )
          }
          {!this.props.userInfo
            ? (
                <Menu.Item
                  key="7"
                  onClick={() => {
                    this.props.history.push(`/signup`)
                    this.props.updateNavKey("7");
                  }}
                  >
                  <Icon type="plus" />
                  <span>Signup</span>
                </Menu.Item>
              )
            : null
          }
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps({ userInfo, navigationBar }){
  return { userInfo, navigationBar };
}

function mapDispatchToProps (dispatch){
  return bindActionCreators({ logout, updateNavKey, updateNavCollapse }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
