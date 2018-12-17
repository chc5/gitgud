import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeNotification } from '../../actions/actions_notification';
import { signup } from '../../actions/actions_account_registration';

// UI Imports
import 'antd/dist/antd.css';
import './Signup.css';
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';
import NavBar from '../NavBar/NavBar';
const FormItem = Form.Item;
const { Header, Content } = Layout;

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = { userName: "", password: "", password_2: "", ordinaryUserSignUp: false };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    if(this.state.password !== this.state.password_2)
      this.props.makeNotification("Passwords are not identical.");
    else if(this.state.password.length < 8)
      this.props.makeNotification("Password must have at least 8 characters.")
    else
      await this.props.signup(this.state, this.props.history);
  }
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }} className="container">
        <NavBar />
        <Layout className="signup-layout">
          <Header style={{ background: "white" }}>
            GitGud
          </Header>
          <Content>
            <Form onSubmit={this.handleSubmit} className="signup-form">
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
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Reenter Password"
                  value={this.state.password_2}
                  onChange={event => this.setState({ password_2: event.target.value })}
                 />
              </FormItem>
              <FormItem>
                Do you wish to sign up to become Ordinary User?
                <Checkbox
                  checked={this.state.ordinaryUserSignUp}
                  onChange={event => this.setState({ ordinaryUserSignUp: !this.state.ordinaryUserSignUp })}
                  />
              </FormItem>
              <FormItem>
                <Button
                  type="primary" htmlType="submit" className="signup-form-button">
                  Register
                </Button>
              </FormItem>
              <FormItem>
                Already have an account? <a href="./login">Login Here!</a>
              </FormItem>
            </Form>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// mapStateToProps = null;
function mapDispatchToProps (dispatch){
  return bindActionCreators({ signup, makeNotification }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps) (Signup));
