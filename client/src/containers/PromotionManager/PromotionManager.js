import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createPromotion,
  retrieveAllPromotion,
  approveUserPromotion,
  denyUserPromotion,
  promoteUser,
  demoteUser
} from '../../actions/actions_promotion';

// UI Imports
import { Layout, List, Icon, Row, Col, Card } from 'antd';
import './PromotionManager.css'
import NavBar from '../NavBar/NavBar';
const { Header, Content } = Layout;

class PromotionManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false
    }
    this.props.retrieveAllPromotion();
  }

  renderPromotionList(){
    return(
      <Card
        title="Promotion List"
        >
        <List
          size="large"
          bordered
          dataSource={this.props.promotionList}
          className="promotion-list"
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
                <Col
                  xs={4} sm={3} md={2} lg={2} xl={2}
                  className="list-item-col"
                  onClick={() => this.approveUserPromotion(item._id)}
                  >
                  <Icon type="check" />
                </Col>
                <Col
                  xs={4} sm={3} md={2} lg={2} xl={2}
                  className="list-item-col"
                  onClick={() => this.denyUserPromotion(item._id)}
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
  renderProfileList(){
    return(
      <Card
        title="Profile List"
        >
        <List
          size="large"
          bordered
          dataSource={this.props.profileList}
          className="promotion-list"
          renderItem={item => (
            <List.Item
              className="list-item"
              >
              <Row type="flex" justify="start" align="middle" className="list-item-row">
                <Col
                  xs={16} sm={18} md={20} lg={20} xl={20}
                  className="list-item-col list-item-title"
                  >
                  {item.username}: {item.content}
                </Col>
                <Col
                  xs={4} sm={3} md={2} lg={2} xl={2}
                  className="list-item-col"
                  onClick={() => this.promoteUser(item._id)}
                  >
                  <Icon type="arrow-up" />
                </Col>
                <Col
                  xs={4} sm={3} md={2} lg={2} xl={2}
                  className="list-item-col"
                  onClick={() => this.demoteUser(item._id)}
                  >
                  <Icon type="arrow-down" />
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
                xs={24} sm={24} md={24} lg={24} xl={24}
                className="col"
                >
                Promotion Manager
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {this.renderProfileList()}
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {this.renderPromotionList()}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ promotionList, profileList }){
  return { promotionList, profileList };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    createPromotion,
    retrieveAllPromotion,
    approveUserPromotion,
    denyUserPromotion,
    promoteUser,
    demoteUser
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PromotionManager));
