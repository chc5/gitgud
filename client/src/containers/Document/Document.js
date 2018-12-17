import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { updateTextField } from '../../actions/actions_text_field';
import { retrieveDocument, updateDocument } from '../../actions/actions_document';
import { lockDocument, unlockDocument } from '../../actions/actions_lock';
import DocComplaintForm from '../DocComplaintForm/DocComplaintForm';
import History from '../History/History';
import Invitation from '../../components/Invitation/Invitation';
// UI Imports
import { Layout, Row, Col } from 'antd';
import './Document.css';
import NavBar from "../NavBar/NavBar";
const { Header, Content } = Layout;

class Document extends Component{
  constructor(props){
    super(props);
    this.state = {
      complaintVisible: false,
      historyVisible: false,
      invitationVisible: false
    };

    let parsedUrl = new URL(window.location.href);
    this.props.retrieveDocument(parsedUrl.pathname.split('/')[2]);

    this.save = this.save.bind(this);
    this.showComplaint = this.showComplaint.bind(this);
    this.hideComplaint = this.hideComplaint.bind(this);
  }

  save = async (event) => {
    await this.props.updateDocument(this.props.document._id, this.props.textField);
  }

  // UI Modal rendering for Complaints and History
  showComplaint = (event) => this.setState({ complaintVisible: true });
  hideComplaint = (event) => this.setState({ complaintVisible: false });
  showHistory = (event) => this.setState({ historyVisible: true });
  hideHistory = (event) => this.setState({ historyVisible: false });
  showInvitation = (event) => this.setState({ invitationVisible: true });
  hideInvitation = (event) => this.setState({ invitationVisible: false });

  renderDocumentBar(){
    return(
      <Header style={{ background: 'silver', padding: 0 }}>
        <Row type="flex" justify="center" align="end">
          {this.props.document.locked === this.props.userInfo._id
            ? (
              <Col
                xs={5} sm={4} md={3} lg={3} xl={2}
                className="col"
                onClick={() =>
                  this.props.unlockDocument(this.props.document._id, this.props.history)}
                >
                Unlock
              </Col>
            )
            : (
              <Col
                xs={5} sm={4} md={3} lg={3} xl={2}
                className="col"
                onClick={() =>
                  this.props.lockDocument(this.props.document._id, this.props.history)}
                >
                Lock
              </Col>
            )
          }
          <Col
            xs={4} sm={4} md={3} lg={3} xl={2}
            className="col"
            onClick={this.save}
            >
            Save
          </Col>
          <Col
            xs={5} sm={4} md={3} lg={3} xl={2}
            className="col"
            onClick={this.showInvitation}
            >
            Invite
          </Col>
          <Col
            xs={5} sm={4} md={3} lg={3} xl={2}
            className="col"
            onClick={this.showHistory}
            >
            History
          </Col>
          <Col
            xs={5} sm={4} md={3} lg={3} xl={2}
            className="col"
            onClick={this.showComplaint}
            >
            Report
          </Col>
        </Row>
      </Header>
    );
  }
  renderComplaintForm(){
    return(
      <DocComplaintForm
        visible={this.state.complaintVisible}
        hideComplaint={this.hideComplaint}
        docTitle={this.props.document.title}
        documentId={this.props.document._id}
       />
    );
  }
  renderHistory(){
    return(
      <History
        documentId={this.props.document._id}
        revisions={this.props.document.revisions}
        docTitle={this.props.document.title}
        visible={this.state.historyVisible}
        hideHistory={this.hideHistory}
      />
    );
  }
  renderInvitation(){
    return(
      <Invitation
        documentId={this.props.document._id}
        docTitle={this.props.document.title}
        visible={this.state.invitationVisible}
        hideInvitation={this.hideInvitation}
      />
    );
  }
  render(){
    return(
      <Layout>
        <NavBar />
        <Layout>
          {this.renderDocumentBar()}
          <Content>
            <textarea
              value={ this.props.textField }
              onChange={event => this.props.updateTextField(event.target.value)}
              className="text-area"
             />
          </Content>
          {this.renderComplaintForm()}
          {this.renderHistory()}
          {this.renderInvitation()}
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ document, textField, userInfo }){
  return { document, textField, userInfo };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateTextField,
    retrieveDocument,
    updateDocument,
    lockDocument,
    unlockDocument
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Document));
