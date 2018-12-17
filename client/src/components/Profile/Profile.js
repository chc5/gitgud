import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveProfile }
  from './../../actions/actions_profile';
import { createUserComplaint }
  from './../../actions/actions_user_complaint';
import { Modal, Button, Card, List } from 'antd';

import "./Profile.css";


class Profile extends Component{
  constructor(props){
    super(props);
    if(this.props.complaintId){
      this.props.retrieveProfile(this.props.profileId);
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.visible !== prevProps.visible){
      this.props.retrieveProfile(this.props.profileId);
    }
  }

  handleCancel = (e) => {
    this.props.hideProfile();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }
  handleReport = (e) => {
    const report = prompt("Please specify your reasons to report this user.");
    this.props.createUserComplaint(this.props.profile.userId._id, report);
    this.props.hideProfile();
  }

  render() {
    if(!this.props.profile){
      return null;
    }
    const p = this.props.profile;
    const footer =[
      <Button
        key="back"
        onClick={this.handleCancel}
        >
        Return
      </Button>
    ];
    if(this.props.userInfo){
      footer.push(
        <Button
          key="report"
          onClick={this.handleReport}
          >
          Report
        </Button>
      );
    }
    return (
      <Modal
         visible={this.props.visible}
         onCancel={this.handleCancel}
         footer={footer}
       >
         <h2>{ p.userId.username }</h2>
         <p>{ p.userId.summary }</p>
         <Card title="Recently Edited Documents:">
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
      </Modal>
    );
  }
}

function mapStateToProps({ profile, userInfo }){
  return { profile, userInfo };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    retrieveProfile,
    createUserComplaint
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Profile));
