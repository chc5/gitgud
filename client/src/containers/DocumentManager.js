import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAllDocument, createDocument, deleteDocument } from '../actions/actions_document';

// UI Imports
import { Layout, Breadcrumb } from 'antd';

import NavigationBar from './NavigationBar';
const { Header, Content } = Layout;

class DocumentManager extends Component{

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ documentList }){
  return { documentList };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveAllDocument, createDocument, deleteDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (DocumentManager);
