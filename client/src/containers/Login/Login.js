import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/actions_account_registration';

// UI Imports
import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button, Layout } from 'antd';
import NavBar from '../NavBar/NavBar';
// https://ant.design/components/form/
const FormItem = Form.Item;

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { userName: "", password: ""};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state, this.props.history);
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }} className="container">
        <NavBar />
        <Layout className="login-layout">
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
            </FormItem>
            <FormItem>
              Or <a href="./signup">Register Now!</a>
            </FormItem>
          </Form>
        </Layout>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ login }, dispatch);
}

export default  withRouter(connect(null, mapDispatchToProps) (Login));
