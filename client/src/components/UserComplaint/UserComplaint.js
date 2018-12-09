Userimport React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveUserComplaint, processUserComplaint, resetUserComplaint }
  from './../../actions/actions_doc_complaint';

import { Modal, Tag, Button } from 'antd';

import "./UserComplaint.css";

class UserComplaint extends Component{
  constructor(props){
    super(props);
    if(this.props.complaintId){
      this.props.retrieveUserComplaint(this.props.complaintId);
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.complaintId !== prevProps.complaintId){
      this.props.retrieveUserComplaint(this.props.complaintId);
    }
  }

  handleProcess = async (e) => {
    await this.props.processUserComplaint(this.props.complaintId);
    this.props.hideComplaint();
    this.props.resetUserComplaint();
  }

  handleCancel = (e) => {
    this.props.hideComplaint();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  getDateTimeFromString = (str) => {
    if(!str){
      return "";
    }
    const blocks = str.split("T");
    const date = blocks[0];
    const time = blocks[1].slice(0, 8);
    return `${date} ${time}`
  }

  render() {
    if(!this.props.complaint){
      return null;
    }
    const c = this.props.complaint;
    const footer =[
      <Button
        key="back"
        onClick={this.handleCancel}
        >
        Return
      </Button>
    ];
    if(c.processed === false){
      footer.push(
        <Button
          key="process"
          onClick={this.handleProcess}
          >
          Process
        </Button>
      );
    }
    return (
      <Modal
         visible={this.props.visible}
         onCancel={this.handleCancel}
         footer={footer}
       >
         <div className="complaint-content">
           <h2>Document Complaint on {c.docId} </h2>
           <h4>{c.fromUserId} | {this.getDateTimeFromString(c.date_created)}</h4>
            {c.processed === true
              ? (<Tag color="lime">Processed</Tag>)
              : (<Tag color="magenta">Not Processed</Tag>)
            }
           <p>{c.content}</p>
         </div>
      </Modal>
    );
  }
}

function mapStateToProps({ complaint }){
  return { complaint };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveUserComplaint, processUserComplaint, resetUserComplaint }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (UserComplaint);
