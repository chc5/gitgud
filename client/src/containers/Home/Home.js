import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
            <Card
              className="nav-card"
              onClick={() => this.props.history.push(`/docs`)}
              >
              Search for Documents
            </Card>
            <Card
              className="nav-card"
              onClick={() => this.props.history.push(`/profiles`)}
              >
              Search for Users
            </Card>
            <Card
              className="nav-card"
              onClick={() => this.props.history.push(`/taboos`)}
              >
              Search for Taboo Words
            </Card>
            <Card
              className="login-card"
              onClick={() => this.props.history.push(`/login`)}
              >
              Login
            </Card>
            <Card
              className="signup-card"
              onClick={() => this.props.history.push(`/signup`)}
              >
              Signup
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ userInfo }){
  return { userInfo };
}

export default withRouter(connect(mapStateToProps) (Home));
