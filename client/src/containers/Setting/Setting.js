import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProfile, retrieveProfile, updateProfile, deleteProfile }
  from '../../actions/actions_profile';

import './Setting.css';
import { Form, Card, Layout, Row, Col, List } from 'antd';
import NavBar from '../NavBar/NavBar';
const { Header, Content } = Layout;

class Setting extends Component{
  constructor(props){
    super(props);
    this.props.retrieveProfile();
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  renderProfile(){
    const p = this.props.profile;
    console.log(p);
    return(
      <Card
        hoverable
      >
        <Row type="flex" justify="center" align="end">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            { p.img
              ? ( <img src={p.img} /> )
              : (null)
            }
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h2>{ p.userId.username }</h2>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <p>{ p.userId.summary }</p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card title="Recently Edited Documents:">
              <List
                size="large"
                bordered
                dataSource={p.recentDocs}
                renderItem={docId => (
                  <List.Item
                    className="list-item"
                    >
                    <div onClick={() => this.history.push(`/docs/${docId}`)}>
                      Document
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }} className="container">
        <NavBar />
        <Layout className="profile-layout">
          <Header style={{ background: "white" }}>
            <h2>User Profile</h2>
          </Header>
          <Content>
                { this.props.profile
                  ? this.renderProfile()
                  : (<h2>This user does not have a profile.</h2>)
                }
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
