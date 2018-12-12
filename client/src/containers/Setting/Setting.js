import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProfile, retrieveProfile, updateProfile, deleteProfile }
  from '../../actions/actions_profile';

import './Setting.css';
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';
import NavBar from '../NavBar/NavBar';
const FormItem = Form.Item;
const { Header, Content } = Layout;

class Setting extends Component{
  constructor(props){
    super(props);
    this.props.retrieveProfile();
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }} className="container">
        <NavBar />
        <Layout className="profile-layout">
          <Header style={{ background: "white" }}>
            Settings
          </Header>
          <Content>
            <Form onSubmit={this.handleSubmit} className="profile-form">

            </Form>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ profile }){
  return { profile };
}

function mapDispatchToProps (dispatch){
  return bindActionCreators({
    createProfile,
    retrieveProfile,
    updateProfile,
    deleteProfile
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Setting));
