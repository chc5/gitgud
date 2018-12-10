import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveDocument } from '../../actions/actions_document';

import { Modal, Steps } from 'antd';
import "./History.css";
const Step = Steps.Step;

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
    return (<div>{date} {time}</div>)
  }
  displayRevision(r){
    return(
      <Step
        key={r._id}
        title={this.getDateTimeFromString(r.date_created)}
        description={r.modifier_id.username}
        className="step-revision"
        onClick={(e) => this.selectRevision(r._id)}
        />
    );
  }
  renderHistory = () => {
    if(!this.props.revisions){
      return null;
    }
    const revisions = this.props.revisions;
    const revisionDisplays = revisions.map(r => this.displayRevision(r));
    return (
      <Steps progressDot direction="vertical" current={revisions.length-1}>
        { revisionDisplays }
      </Steps>
    );
  }
  render() {
    return (
      <Modal
         visible={this.props.visible}
         onCancel={this.handleCancel}
         title="History"
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
