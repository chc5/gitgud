import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Layout } from 'antd';

import NavBar from '../NavBar/NavBar';
import "./Home.css";
const { Header, Content } = Layout;

class Home extends Component{
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {this.props.userInfo
              ? (<span>Welcome, { this.props.userInfo.username }</span>)
              : (<span>Home</span>)
            }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Card className="nav-card">Search for Documents</Card>
            <Card className="nav-card">Search for Users</Card>
            <Card className="nav-card">Search for Taboo Words</Card>
            <Card className="login-card">Login</Card>
            <Card className="signup-card">Signup</Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ userInfo }){
  return { userInfo };
}

export default connect(mapStateToProps) (Home);
