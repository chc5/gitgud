import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { inviteUsersToDoc } from '../../actions/actions_document';

import {
  Form, Modal, Button, Checkbox, Icon, Input
} from 'antd';

import "./Invitation.css";

const FormItem = Form.Item;

class Invitation extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: ""
    }
  }

  handleCancel = (e) => {
    this.props.hideInvitation();
  }

  handleSubmit = async (e) => {
    const docId = this.props.documentId;
    const permission =
      this.state.write_access ? 6 : ( this.state.read_access ? 4 : 0 )
    const username = this.state.username;
    const success = await this.props.inviteUsersToDoc(docId, username, permission);
    this.setState({ username: "" });
    if(success === true)
      this.props.hideInvitation();
  }

  renderForm(){
    return (
      <Form>
        <h2>Invite Users to {this.props.docTitle}</h2>
          <FormItem>
           <Input
             prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
             placeholder="Username"
             value={this.state.username}
             onChange={event => this.setState({ username: event.target.value })}
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
              Invite
            </Button>
          ]}
       >
        { this.renderForm() }
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ inviteUsersToDoc }, dispatch);
}

export default connect(null, mapDispatchToProps) (Invitation);
