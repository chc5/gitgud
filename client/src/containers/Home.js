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
            Home
          </Header>
          <Content style={{ margin: '0 16px' }}>
            List of stuff here.
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// mapStateToProps = null;
// mapDispatchToProps = null;

export default connect(null) (Home);
