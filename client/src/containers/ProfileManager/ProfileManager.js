import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAllProfiles }
  from '../../actions/actions_profile';
import Profile from '../../components/Profile/Profile';

// UI Imports
import { Layout, List, Row, Col } from 'antd';
import NavBar from '../NavBar/NavBar';
import './ProfileManager.css';
const { Header, Content } = Layout;

class ProfileManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      profileVisible: false
    }
    this.props.retrieveAllProfiles();
    this.showProfile = this.showProfile.bind(this);
    this.hideProfile = this.hideProfile.bind(this);
  }

  showProfile(profileId){
    this.props.history.push(`/profiles/${profileId}`);
    this.setState({ profileVisible: true, selectedProfileId: profileId });
  }

  hideProfile(event){
    this.props.history.push(`/profiles/doc`);
    this.setState({ profileVisible: false });
  }

  renderProfile(){
    console.log(this.state.profileVisible);
    return(
      <Profile
        profileId={this.state.selectedProfileId}
        visible={this.state.profileVisible}
        hideProfile={this.hideProfile}
      />
    );
  }
  render(){
    console.log(this.props.profileList);
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Layout>
          <Header style={{ background: 'silver', padding: 0 }}>
            <Row type="flex" justify="center" align="end">
              <Col
                xs={24} sm={24} md={24} lg={24} xl={24}
                className="profile-title"
                >
                <h2>User Profiles</h2>
              </Col>
            </Row>
          </Header>
          <Content>
            <List
              size="large"
              bordered
              dataSource={this.props.profileList}
              renderItem={p => (
                <List.Item
                  className="list-item"
                  >
                  <Row type="flex" justify="start" align="middle" className="list-item-row">
                    <Col
                      xs={24} sm={24} md={24} lg={24} xl={24}
                      className="list-item-col list-item-title"
                      onClick={() => this.showProfile(p.userId._id)}
                      >
                      {p.userId.username}
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Content>
          {this.renderProfile()}
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ profileList }){
  return { profileList };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveAllProfiles }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ProfileManager));
