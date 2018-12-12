import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPrivacy }
  from './../../actions/actions_document';
import { PRIVATE, PUBLIC, SHARED, RESTRICTED }
  from './../../constants/types_permission';

import { Modal, Radio, Button, Form } from 'antd';
import "./PrivacySettings.css";
const FormItem = Form.Item;

class PrivacySettings extends Component{
  constructor(props){
    super(props);
    this.state = {
      canSubmit: false,
      selectedPrivacyLevel: ""
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.document !== prevProps.document){
      this.setState({ selectedPrivacyLevel: this.props.document.privacy.level });
      if(this.props.document.owner_id === this.props.userInfo._id){
        this.setState({ canSubmit: true });
      }
      else{
        this.setState({ canSubmit: false });
      }
    }
  }

  handlePrivacyChange = (e) => this.setState({ selectedPrivacyLevel: e.target.value });

  handlePrivacy = async (e) => {
    const success = await this.props.setPrivacy(this.props.document._id, this.state.selectedPrivacyLevel);
    if(success === true){
      this.props.hidePrivacySettings();
    }
  }

  handleCancel = (e) => {
    this.props.hidePrivacySettings();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    if(!this.props.document){
      return null;
    }
    const footer = [
      <Button
        key="back"
        onClick={this.handleCancel}
        >
        Return
      </Button>
    ];
    if(this.state.canSubmit === true){
      footer.push(
        <Button
          key="process"
          onClick={this.handlePrivacy}
          >
          Submit
        </Button>
      );
    }
    return (
      <Modal
         visible={this.props.visible}
         onCancel={this.handleCancel}
         footer={footer}
      >
        <Form>
          <h2>Document Privacy Settings for {this.props.document.title}</h2>
          <FormItem label="Privacy Level">
            <Radio.Group
              value={this.state.selectedPrivacyLevel}
              onChange={this.handlePrivacyChange}
              >
              <Radio.Button
                value={PUBLIC}
                disabled={ !this.state.canSubmit && this.state.selectedPrivacyLevel !== PUBLIC }
                >
                Public
              </Radio.Button>
              <Radio.Button
                value={SHARED}
                disabled={ !this.state.canSubmit && this.state.selectedPrivacyLevel !== SHARED }
                >
                Shared
              </Radio.Button>
              <Radio.Button
                value={RESTRICTED}
                disabled={ !this.state.canSubmit && this.state.selectedPrivacyLevel !== RESTRICTED }
                >
                Restricted
              </Radio.Button>
              <Radio.Button
                value={PRIVATE}
                disabled={ !this.state.canSubmit && this.state.selectedPrivacyLevel !== PRIVATE }
                >
                Private
              </Radio.Button>
            </Radio.Group>
          </FormItem>
       </Form>
      </Modal>
    );
  }
}

function mapStateToProps({ userInfo }){
  return { userInfo }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setPrivacy
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (PrivacySettings);
