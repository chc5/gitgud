import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAllDocument, createDocument, deleteDocument }
  from '../../actions/actions_document';
// UI Imports
import { Layout, List, Icon, Row, Col } from 'antd';
import './DocumentManager.css';
import NavBar from '../NavBar/NavBar';
const { Header, Content } = Layout;

class DocumentManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
    }
    this.props.retrieveAllDocument();
  }
  createDocument(){
    let docName = prompt("Enter new file name.");
    this.props.createDocument(docName, this.props.history);
  }
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Layout>
          <Header style={{ background: 'silver', padding: 0 }}>
            <Row type="flex" justify="center" align="end">
              <Col
                xs={5} sm={4} md={3} lg={2} xl={1}
                className="col"
                >
                <Icon
                  type="file-add"
                  className="doc-icon"
                  onClick={() => this.createDocument()}
                 />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <List
              size="large"
              bordered
              dataSource={this.props.documentList}
              renderItem={item => (
                <List.Item
                  onClick={() => this.props.history.push(`/docs/${item._id}`)}
                  >
                  {item.title}
                  <Icon type="edit" />
                  <Icon
                    type="delete"
                    onClick={() => this.props.deleteDocument(item._id)}
                    />
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ documentList, userInfo }){
  return { documentList, userInfo };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveAllDocument, createDocument, deleteDocument }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (DocumentManager));
