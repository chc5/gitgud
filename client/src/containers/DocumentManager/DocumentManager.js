import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAllDocument, createDocument, deleteDocument }
  from '../../actions/actions_document';

// UI Imports
import { Layout, List } from 'antd';

import NavBar from '../NavBar/NavBar';
const { Header, Content } = Layout;

class DocumentManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      data: [
        'Document # 1: hohoho.txt',
        'Document # 2: pohoho.txt',
        'Document # 3: fohoho.txt',
        'Document # 4: gohoho.txt',
        'Document # 5: zohoho.txt',
      ]
    }
  }

  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            Document Manager
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <List
              size="large"
              bordered
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item
                  onClick={() => this.props.history.push(`/docs/${item}`)}
                  >
                  {item}
                </List.Item>
              )}
            />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (DocumentManager));
