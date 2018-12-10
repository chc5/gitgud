import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAllDocument, createDocument, deleteDocument }
  from '../../actions/actions_document';
import { lockDocument, unlockDocument }
  from '../../actions/actions_lock';
// UI Imports
import { Layout, Row, Col, Spin } from 'antd';
import './DocumentManager.css';
import NavBar from '../NavBar/NavBar';
import DocumentList from '../../components/DocumentList/DocumentList';
const { Header, Content } = Layout;

class DocumentManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
    this.props.retrieveAllDocument();
  }

  createDocument = async () => {
    let docName = prompt("Enter new file name.");
    if(docName){
      this.setState({ loading: true });
      await this.props.createDocument(docName, this.props.history);
      await this.props.retrieveAllDocument();
      this.setState({ loading: false });
    }
  }

  renderLoading(){
    if(this.state.loading === true){
      return (
        <div style={{ padding:"1%" }}>
          <Spin />
        </div>
      );
    }
    else{
      return null;
    }
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
                onClick={this.createDocument}
                >
                Create
              </Col>
            </Row>
          </Header>
          <Content>
            {this.renderLoading()}
            <DocumentList
              lockDocument={this.lockDocument}
              unlockDocument={this.unlockDocument}
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
  return bindActionCreators({
    retrieveAllDocument,
    createDocument,
    deleteDocument,
    lockDocument,
    unlockDocument
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (DocumentManager));
