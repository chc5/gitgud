// React-Redux Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTextField } from '../actions/actions_text_field';
import { retrieveDocument, updateDocument } from '../actions/actions_document';
// UI Imports
import { Input, Layout, Button } from 'antd';
import './Document.css';
import NavigationBar from "./NavigationBar";
const { TextArea } = Input;
const { Header, Footer, Content } = Layout;

class Document extends Component{
  constructor(props){
    super(props);
    let parsedUrl = new URL(window.location.href);
    this.props.retrieveDocument(parsedUrl.pathname.split('/')[1]);
    this.save = this.save.bind(this);
  }
  save(event){
    console.log("hi")
    this.props.updateDocument(0, this.props.textField);
  }
  render(){
    return(
      <Layout>
        <NavigationBar />
        <Layout>
          <Header><Button onClick={this.save}>Save</Button></Header>
          <Content>
            <textarea
              value={ this.props.textField }
              onChange={event => this.props.updateTextField(event.target.value)}
              className="text-area"
             />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ textField }){
  return { textField };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateTextField, retrieveDocument, updateDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Document);
