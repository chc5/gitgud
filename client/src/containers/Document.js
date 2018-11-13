// React-Redux Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTextField } from '../actions/actions_text_field';

// UI Imports
import { Input, Layout } from 'antd';
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;

class Document extends Component{
  render(){
    return(
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <TextArea
              value={ this.props.textField }
              onChange={event => this.props.updateTextField(event.target.value)}
            />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

function mapStateToProps({ textField }){
  return { textField };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateTextField }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Document);
