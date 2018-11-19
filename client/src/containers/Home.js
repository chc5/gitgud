import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Layout, Breadcrumb } from 'antd';

import NavigationBar from './NavigationBar';
const { Header, Content } = Layout;

class Home extends Component{
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {this.props.userInfo
              ? (<span>Welcome, { this.props.userInfo.username }</span>)
              : (<span>Home</span>)
            }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            List of stuff here.
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
