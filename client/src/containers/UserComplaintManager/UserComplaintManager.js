import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAllUserComplaint, deleteUserComplaint }
  from '../../actions/actions_user_complaint';
// UI Imports
import { Layout, List, Icon, Row, Col } from 'antd';
import NavBar from '../NavBar/NavBar';
// import './UserComplaintManager.css';
const { Header, Content } = Layout;

class UserComplaintManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      complaintVisible: false
    }
    this.props.retrieveAllUserComplaint();
    this.showComplaint = this.showComplaint.bind(this);
    this.hideComplaint = this.hideComplaint.bind(this);
  }

  deleteUserComplaint = async (id) => {
    await this.props.deleteUserComplaint(id);
    this.props.retrieveAllUserComplaint();
  }

  showComplaint(event){
    this.setState({ complaintVisible: false });
    this.props.history.push(`/complaints/user`);
  }

  hideComplaint(event){
    this.setState({ complaintVisible: false });
  }

  renderComplaintForm(id){
    return(
      null
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
                User Complaint List
              </Col>
            </Row>
          </Header>
          <Content>
            <List
              size="large"
              bordered
              dataSource={this.props.userComplaintList}
              renderItem={item => (
                <List.Item
                  className="list-item"
                  >
                  <Row type="flex" justify="start" align="middle" className="list-item-row">
                    <Col
                      xs={20} sm={22} md={23} lg={23} xl={23}
                      className="list-item-col list-item-title"
                      onClick={() => this.props.history.push(`/complaints/user/${item._id}`)}
                      >
                      {item.title}
                    </Col>
                    <Col
                      xs={4} sm={2} md={1} lg={1} xl={1}
                      className="list-item-col"
                      onClick={() => this.deleteUserComplaint(item._id)}
                      >
                      <Icon type="delete" />
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ userComplaintList }){
  console.log(userComplaintList);
  return { userComplaintList };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveAllUserComplaint, deleteUserComplaint }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (UserComplaintManager));
