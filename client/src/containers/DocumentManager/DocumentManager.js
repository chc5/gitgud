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
                xs={8} sm={5} md={4} lg={3} xl={2}
                className="col"
                >
                Create
              </Col>
            </Row>
          </Header>
          <Content>
            <List
              size="large"
              bordered
              dataSource={this.props.documentList}
              renderItem={item => (
                <List.Item
                  className="list-item"
                  >
                  <Row type="flex" justify="start" align="middle" className="list-item-row">
                    <Col
                      xs={16} sm={20} md={22} lg={22} xl={22}
                      className="list-item-col list-item-title"
                      onClick={() => this.props.history.push(`/docs/${item._id}`)}
                      >
                      {item.title}
                    </Col>
                    <Col
                      xs={4} sm={2} md={1} lg={1} xl={1}
                      className="list-item-col"
                      onClick={() => this.props.history.push(`/docs/${item._id}`)}
                      >
                      <Icon type="edit" />
                    </Col>
                    <Col
                      xs={4} sm={2} md={1} lg={1} xl={1}
                      className="list-item-col"
                      onClick={() => this.props.deleteDocument(item._id)}
                      >
                      <Icon type="delete" />
                    </Col>
                  </Row>
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
