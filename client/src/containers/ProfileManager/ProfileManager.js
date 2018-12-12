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
    return(
      <Profile
        profileId={this.state.selectedProfileId}
        visible={this.state.profileVisible}
        hideProfile={this.hideComplaint}
      />
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
                className="complaint-title"
                >
                User Profiles
              </Col>
            </Row>
          </Header>
          <Content>
            <List
              size="large"
              bordered
              dataSource={this.props.profileList}
              renderItem={item => (
                <List.Item
                  className="list-item"
                  >
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
