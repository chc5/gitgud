import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/actions_account_registration';
import { updateNavKey, updateNavCollapse } from '../../actions/actions_nav_bar';
import Notice from '../../components/Notice/Notice';
import { OU, SU } from '../../constants/types_permission';
// UI Imports
import { Layout, Menu, Icon } from 'antd';
import "./NavBar.css";

const { Sider } = Layout;

// Navigation Bar for the entire website.
class NavBar extends Component{
  render(){
    return(
      <Sider
        collapsible
        collapsed={this.props.navBar.collapsed}
        onCollapse={this.props.updateNavCollapse}
      >
        <Notice />
        <Menu
          theme="dark"
          defaultSelectedKeys={this.props.navBar.key}
          mode="inline"
          className="nav-bar"
          >

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
          { this.props.userInfo
            ? (
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
              )
            : null
          }
          { this.props.userInfo
            ? (
                <Menu.Item
                  key="3"
                  onClick={() => {
                    this.props.history.push(`/profiles`);
                    this.props.updateNavKey("3");
                  }}
                  >
                  <Icon type="user" />
                  <span>User Profiles</span>
                </Menu.Item>
              )
            : null
          }
          { this.props.userInfo &&
            (this.props.userInfo.role === OU ||
              this.props.userInfo.role === SU)
            ? (
                <Menu.Item
                  key="4"
                  onClick={() => {
                    this.props.history.push(`/taboos`);
                    this.props.updateNavKey("4");
                  }}
                  >
                  <Icon type="safety-certificate" />
                  <span>Taboo Words Banned</span>
                </Menu.Item>
              )
            : null
          }
          { this.props.userInfo &&
            (this.props.userInfo.role === OU ||
              this.props.userInfo.role === SU)
            ? (
                <Menu.Item
                  key="5"
                  onClick={() => {
                    this.props.history.push(`/complaints/doc`);
                    this.props.updateNavKey("5");
                  }}
                  >
                  <Icon type="exception" />
                  <span>Document Complaints</span>
                </Menu.Item>
              )
            : null
          }
          { this.props.userInfo &&
            this.props.userInfo.role === SU
            ? (
                <Menu.Item
                  key="6"
                  onClick={() => {
                    this.props.history.push(`/complaints/user`);
                    this.props.updateNavKey("6");
                  }}
                  >
                  <Icon type="customer-service" />
                  <span>User Complaints</span>
                </Menu.Item>
              )
            : null
          }
          { this.props.userInfo && this.props.userInfo.role === SU
            ? (
                <Menu.Item
                  key="7"
                  onClick={() => {
                    this.props.history.push(`/promotion`);
                    this.props.updateNavKey("7");
                  }}
                  >
                  <Icon type="global" />
                  <span>User Promotion</span>
                </Menu.Item>
              )
            : null
          }
          { this.props.userInfo
            ? (
              <Menu.Item
                key="8"
                onClick={() => {
                  this.props.history.push(`/setting`);
                  this.props.updateNavKey("8");
                }}
                >
                <Icon type="setting" />
                <span>Settings</span>
              </Menu.Item>
            )
            : null
          }
          { !this.props.userInfo
            ? (
                <Menu.Item
                  key="9"
                  onClick={() => {
                    this.props.history.push(`/login`);
                    this.props.updateNavKey("9");
                  }}
                  >
                  <Icon type="login" />
                  <span>Login</span>
                </Menu.Item>
              )
            : null
          }
          { this.props.userInfo
            ? (
                <Menu.Item
                  key="10"
                  onClick={() => {
                    this.props.logout(this.props.history)
                    this.props.updateNavKey("10");
                  }}
                  >
                  <Icon type="logout" />
                  <span>Logout</span>
                </Menu.Item>
              )
            : null
          }
          {!this.props.userInfo
            ? (
                <Menu.Item
                  key="11"
                  onClick={() => {
                    this.props.history.push(`/signup`)
                    this.props.updateNavKey("11");
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

function mapStateToProps({ userInfo, navBar }){
  return { userInfo, navBar };
}

function mapDispatchToProps (dispatch){
  return bindActionCreators({ logout, updateNavKey, updateNavCollapse }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
