import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTextField } from '../../actions/actions_text_field';
import { retrieveDocument, updateDocument } from '../../actions/actions_document';
// UI Imports
import { Layout, Button } from 'antd';
import './Document.css';
import NavBar from "../NavBar/NavBar";
const { Header, Content } = Layout;

class Document extends Component{
  constructor(props){
    super(props);
    let parsedUrl = new URL(window.location.href);
    this.props.retrieveDocument(parsedUrl.pathname.split('/')[2]);
    this.save = this.save.bind(this);
  }
  save(event){
    this.props.updateDocument(this.props.document._id, this.props.textField);
  }
  render(){
    return(
      <Layout>
        <NavBar />
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

function mapStateToProps({ document, textField }){
  return { document, textField };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateTextField, retrieveDocument, updateDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Document);
