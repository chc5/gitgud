import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTextField } from '../../actions/actions_text_field';
import { retrieveDocument, updateDocument } from '../../actions/actions_document';

import Complaint from '../../components/Complaint/Complaint';
// UI Imports
import { Layout, Icon, Row, Col } from 'antd';
import './Document.css';
import NavBar from "../NavBar/NavBar";
const { Header, Content, Modal } = Layout;

class Document extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
    let parsedUrl = new URL(window.location.href);
    this.props.retrieveDocument(parsedUrl.pathname.split('/')[2]);
    this.save = this.save.bind(this);
    this.handleComplaint = this.handleComplaint.bind(this);
  }
  save(event){
    this.props.updateDocument(this.props.document._id, this.props.textField);
  }
  handleComplaint(event){
    this.setState({
      visible: true
    });
  }

  render(){
    return(
      <Layout>
        <NavBar />
        <Layout>
          <Header style={{ background: 'silver', padding: 0 }}>
            <Row type="flex" justify="center" align="end">
              <Col
                xs={5} sm={4} md={3} lg={2} xl={1}
                className="col"
                >
                <Icon
                  className="doc-icon"
                  type="save"
                  onClick={this.save}
                 />
              </Col>
              <Col
                xs={5} sm={4} md={3} lg={2} xl={1}
                className="col"
                >
                <Icon
                  className="doc-icon"
                  type="bars"
                  />
              </Col>
              <Col
                xs={5} sm={4} md={3} lg={2} xl={1}
                className="col"
                >
                <Icon
                  className="doc-icon"
                  type="alert"
                  onClick={this.handleComplaint}
                  />
              </Col>
            </Row>
          </Header>
          <Content>
            <textarea
              value={ this.props.textField }
              onChange={event => this.props.updateTextField(event.target.value)}
              className="text-area"
             />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ document, textField }){
  return { document, textField };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateTextField, retrieveDocument, updateDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Document);
