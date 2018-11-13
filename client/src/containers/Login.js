import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/actions_account_registration';

import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

// https://ant.design/components/form/

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { userName: "", password: ""};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            value={this.state.userName}
            onChange={event => this.setState({ userName: event.target.value })}
           />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
           />
        </FormItem>
        <FormItem>
          <Button
            type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">Register Now!</a>
        </FormItem>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ login }, dispatch);
}

export default connect(null, mapDispatchToProps) (Login);
