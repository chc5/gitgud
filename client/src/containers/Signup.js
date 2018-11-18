import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI Imports
import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button, Layout } from 'antd';
import NavigationBar from './NavigationBar';
const FormItem = Form.Item;

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = { userName: "", password: ""};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  }
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationBar />
        <Layout>
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
                Register
              </Button>
              Already have an account? <a href="./signup">Login Here!</a>
            </FormItem>
          </Form>
        </Layout>
      </Layout>
    );
  }
}

// mapStateToProps = null;
// mapDispatchToProps = null;

export default connect(null) (Signup);
