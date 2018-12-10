import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createTabooWord,
  retrieveApprovedTabooWord,
  retrieveUnapprovedTabooWord,
  approveTabooWord,
  deleteTabooWord
} from '../../actions/actions_taboo';

// UI Imports
import { Layout, List, Icon, Row, Col, Card } from 'antd';
import './TabooWordManager.css'
import NavBar from '../NavBar/NavBar';
const { Header, Content } = Layout;
const APPROVED_TABOO_WORDS_TITLE = "Approved Taboo Words";
const UNAPPROVED_TABOO_WORDS_TITLE = "Unapproved Taboo Words";

class TabooWordManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    }
    this.props.retrieveApprovedTabooWord();
    this.props.retrieveUnapprovedTabooWord();
  }

  approveTabooWord = async (tabooId) => {
    await this.props.approveTabooWord(tabooId);
    this.props.retrieveApprovedTabooWord();
    this.props.retrieveUnapprovedTabooWord();
  }

  createTabooWord = async () => {
    let tabooWord = prompt("Suggest a Taboo Word.");
    if(tabooWord){
      await this.props.createTabooWord(tabooWord);
      this.props.retrieveUnapprovedTabooWord();
    }
  }

  deleteTabooWord = async (tabooId) => {
    await this.props.deleteTabooWord(tabooId);
    this.props.retrieveUnapprovedTabooWord();
    this.props.retrieveApprovedTabooWord();
  }

  renderTabooList = (title, tabooList) => {
    if(!tabooList){
      return null;
    }
    return(
      <Card
        title={title}
        >
        <List
          size="large"
          bordered
          dataSource={tabooList}
          className="taboo-list"
          renderItem={item => (
            <List.Item
              className="list-item"
              >
              <Row type="flex" justify="start" align="middle" className="list-item-row">
                <Col
                  xs={16} sm={18} md={20} lg={20} xl={20}
                  className="list-item-col list-item-title"
                  >
                  {item.word}
                </Col>
                {title === UNAPPROVED_TABOO_WORDS_TITLE
                  ? (
                    <Col
                      xs={4} sm={3} md={2} lg={2} xl={2}
                      className="list-item-col"
                      onClick={() => this.approveTabooWord(item._id)}
                      >
                      <Icon type="check" />
                    </Col>
                  ) : (
                    <Col xs={4} sm={3} md={2} lg={2} xl={2}></Col>
                  )
                }
                <Col
                  xs={4} sm={3} md={2} lg={2} xl={2}
                  className="list-item-col"
                  onClick={() => this.deleteTabooWord(item._id)}
                  >
                  <Icon type="delete" />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    );
  }
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Layout>
          <Header style={{ background: 'silver', padding: 0 }}>
            <Row type="flex" justify="center" align="end">
              <Col
                xs={10} sm={6} md={5} lg={4} xl={3}
                className="col"
                onClick={this.createTabooWord}
                >
                Create Taboo
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                {this.renderTabooList(APPROVED_TABOO_WORDS_TITLE, this.props.approvedTabooWords)}
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                {this.renderTabooList(UNAPPROVED_TABOO_WORDS_TITLE, this.props.unapprovedTabooWords)}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ approvedTabooWords, unapprovedTabooWords }){
  return { approvedTabooWords, unapprovedTabooWords };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    createTabooWord,
    retrieveApprovedTabooWord,
    retrieveUnapprovedTabooWord,
    approveTabooWord,
    deleteTabooWord
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (TabooWordManager));
