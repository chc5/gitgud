import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createDocComplaint } from '../../actions/actions_doc_complaint';

import {
  Form, Modal, Button
} from 'antd';

import "./DocComplaintForm.css";

const FormItem = Form.Item;

class DocComplaintForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.visible,
      content: "",
      loading: false
    }
  }

  handleCancel = (e) => {
    this.props.hideComplaint();
  }

  handleSubmit = async (e) => {
    const docId = this.props.documentId;
    const revisionId = this.props.revisionId;
    const content = this.state.content;
    await this.props.createDocComplaint(docId, revisionId, content);
    this.setState({ content: "" });
    this.props.hideComplaint();
  }

  updateTextField = (text) => {
    this.setState({ content: text });
  }

  renderForm(){
    return (
      <Form>
        <h2>File a Complaint on {this.props.docTitle}</h2>
        <FormItem
           label="Complaint Details"
         >
         <textarea
           value={ this.state.content }
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
  return bindActionCreators({ createDocComplaint }, dispatch);
}

export default connect(null, mapDispatchToProps) (DocComplaintForm);
