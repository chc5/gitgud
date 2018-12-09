import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { retrieveDocument } from '../../actions/actions_document';

import {
  Form, Modal, Button
} from 'antd';

import "./History.css";

const FormItem = Form.Item;

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
    this.props.hideComplaint();
  }

  handleSubmit = async (e) => {
    const docId = this.props.documentId;
    const revisionId = this.props.revisionId;
    const complaintText = this.state.complaintDetails;
    await this.props.createDocComplaint(docId, revisionId, complaintText);
    this.setState({ complaintDetails: "" });
    console.log(this.state.complaintDetails);
    this.props.hideComplaint();
  }

  updateTextField = (text) => {
    this.setState({ complaintDetails: text });
  }

  renderForm = () => {
    return (
      <Form>
        <h2>File a Complaint on {this.props.docTitle}</h2>
        <FormItem
           label="Complaint Details"
         >
         <textarea
           value={ this.state.complaintDetails }
           onChange={event => this.updateTextField(event.target.value)}
           className="complaint-text-area"
          />
        </FormItem>
      </Form>
    );
  }
  render() {
    return (
      <Modal
         visible={this.props.visible}
         onCancel={this.handleCancel}
         footer={[
            <Button
              key="back"
              onClick={this.handleCancel}
              >
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleSubmit}
              >
              Submit
            </Button>
          ]}
       >
        { this.renderForm() }
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveDocument }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps) (History));
