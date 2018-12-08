import React, { Component } from 'react';

import {
  Form, Modal
} from 'antd';

import "./Complaint.css";

const FormItem = Form.Item;
class Complaint extends Component{
  state = {
    visible: this.props.visible,
    complaintDetails: ""
  }

  handleOk = (e) => {
    this.props.hideComplaint();
  }

  handleCancel = (e) => {
    this.props.hideComplaint();
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }
  updateTextField = (text) => {
    this.setState({ complaintDetails: text });
  }
  render() {
    return (
      <Modal
         visible={this.props.visible}
         onOk={this.handleOk}
         onCancel={this.handleCancel}
       >
        <Form onSubmit={this.handleSubmit}>
          <h2>File a Complaint on {this.props.docTitle}</h2>
          <FormItem
             label="Complaint Details"
           >
           <textarea
             value={ this.state.textarea }
             onChange={event => this.updateTextField(event.target.value)}
             className="complaint-text-area"
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Complaint;
