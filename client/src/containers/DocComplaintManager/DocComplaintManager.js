import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAllDocComplaint, deleteDocComplaint }
  from '../../actions/actions_doc_complaint';
import DocComplaint from '../../components/DocComplaint/DocComplaint';
// UI Imports
import { Layout, List, Icon, Row, Col } from 'antd';
import NavBar from '../NavBar/NavBar';
import './DocComplaintManager.css';
const { Header, Content } = Layout;

class DocComplaintManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      complaintVisible: false
    }
    this.props.retrieveAllDocComplaint();
    this.showComplaint = this.showComplaint.bind(this);
    this.hideComplaint = this.hideComplaint.bind(this);
  }

  deleteDocComplaint = async (id) => {
    await this.props.deleteDocComplaint(id);
    this.props.retrieveAllDocComplaint();
  }

  showComplaint(complaintId){
    this.props.history.push(`/complaints/doc/${complaintId}`);
    this.setState({ complaintVisible: true, selectedComplaintId: complaintId });
  }

  hideComplaint(event){
    this.setState({ complaintVisible: false });
    this.props.history.push(`/complaints/doc`);
  }

  renderComplaint(){
    return(
      <DocComplaint
        complaintId={this.state.selectedComplaintId}
        visible={this.state.complaintVisible}
        hideComplaint={this.hideComplaint}
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
                Document Complaint List
              </Col>
            </Row>
          </Header>
          <Content>
            <List
              size="large"
              bordered
              dataSource={this.props.docComplaintList}
              renderItem={item => (
                <List.Item
                  className="list-item"
                  >
                  <Row type="flex" justify="start" align="middle" className="list-item-row">
                    <Col
                      xs={20} sm={22} md={23} lg={23} xl={23}
                      className="list-item-col list-item-title"
                      onClick={() => this.showComplaint(item._id)}
                      >
                      {item.title}
                    </Col>
                    <Col
                      xs={4} sm={2} md={1} lg={1} xl={1}
                      className="list-item-col"
                      onClick={() => this.deleteDocComplaint(item._id)}
                      >
                      <Icon type="delete" />
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Content>
          {this.renderComplaint()}
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ docComplaintList }){
  return { docComplaintList };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ retrieveAllDocComplaint, deleteDocComplaint }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (DocComplaintManager));
