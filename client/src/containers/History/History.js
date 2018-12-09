import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveDocument } from '../../actions/actions_document';

import { Modal, List, Row, Col } from 'antd';
import "./History.css";

class History extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.visible,
      complaintDetails: "",
      loading: false
    }
  }

  handleCancel = (e) => {
    this.props.hideHistory();
  }

  selectRevision = async (revisionId) =>{
    console.log(this.props);
    console.log("selecting revision", "revisionid: ", revisionId, "documentId:", this.props.documentId);
    await this.props.retrieveDocument(this.props.documentId, revisionId);
    this.props.hideHistory();
  }

  getDateTimeFromString = (str) => {
    if(!str){
      return "";
    }
    const blocks = str.split("T");
    const date = blocks[0];
    const time = blocks[1].slice(0, 8);
    return `${date} ${time}`
  }

  renderHistory = () => {
    return (
      <List
        size="large"
        bordered
        dataSource={this.props.revisions}
        renderItem={r => (
          <List.Item
            className="list-item"
            >
            <Row type="flex" justify="start" align="middle" className="list-item-row">
              <Col
                xs={14} sm={24} md={24} lg={24} xl={24}
                className="list-item-col"
                onClick={() => this.selectRevision(r._id)}
                >
                Revision Id: {r._id} <br />
                Document Id: {this.props.documentId} <br />
                {this.getDateTimeFromString(r.date_created)} <br />
                {r.modifier_id.username}
              </Col>
            </Row>
          </List.Item>
        )}
      />
    );
  }
  render() {
    return (
      <Modal
         visible={this.props.visible}
         onCancel={this.handleCancel}
       >
       {this.renderHistory()}
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveDocument }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps) (History));
