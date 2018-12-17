import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProfile, retrieveProfile, updateProfile, deleteProfile }
  from '../../actions/actions_profile';
import { createPromotion }
  from '../../actions/actions_promotion';
import './Setting.css';
import { Card, Layout, Row, Col, List, Button } from 'antd';
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
  createPromotion = async () => {
    const reason = prompt("Provide a reason why you want to be an Ordinary User");
    await this.props.createPromotion(reason);
    alert("Your reason will be considered by the Super User");
  }
  renderProfile(){
    const p = this.props.profile;
    return(
      <Card
        hoverable
      >
        <Row type="flex" justify="center" align="end">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            { p.img
              ? ( <img alt="Not Found" src={p.img} /> )
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
            <Card title="Most Relevant Documents:">
              <List
                size="large"
                bordered
                dataSource={p.recentDocs}
                renderItem={docId => (
                  <List.Item
                    className="list-item"
                    >
                    <div onClick={() => this.props.history.push(`/docs/${docId}`)}>
                      Document
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          { this.props.userInfo && this.props.userInfo.role === "GU"
            ? (
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                Do you wish to become Ordinary User? <br />
                <Button
                  type="primary"
                  onClick={() => this.createPromotion()}
                  >
                  Click here
                </Button>
              </Col>
            )
            : null
          }
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
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ profile, userInfo }){
  return { profile, userInfo };
}

function mapDispatchToProps (dispatch){
  return bindActionCreators({
    createProfile,
    retrieveProfile,
    updateProfile,
    deleteProfile,
    createPromotion
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Setting));
