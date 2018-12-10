import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lockDocument, unlockDocument }
  from '../../actions/actions_lock';
import { deleteDocument }
  from '../../actions/actions_document';
// UI Imports
import { List, Icon, Row, Col } from 'antd';
import './DocumentList.css';

class DocumentList extends Component{
  render(){
    if(!this.props.documentList || this.props.documentList.length === 0){
      return null;
    }
    return(
      <List
        size="large"
        bordered
        dataSource={this.props.documentList}
        renderItem={item => (
          <List.Item
            className="list-item"
            >
            <Row type="flex" justify="start" align="middle" className="list-item-row">
              <Col
                xs={16} sm={20} md={22} lg={22} xl={22}
                className="list-item-col list-item-title"
                onClick={() => this.props.history.push(`/docs/${item._id}`)}
                >
                {item.title}
              </Col>
              { item.locked
                ? (
                  <Col
                    xs={4} sm={2} md={1} lg={1} xl={1}
                    className="list-item-col"
                    onClick={() => this.props.unlockDocument(item._id, this.props.history)}
                    >
                    <Icon type="unlock" />
                  </Col>
                )
                : (
                  <Col
                    xs={4} sm={2} md={1} lg={1} xl={1}
                    className="list-item-col"
                    onClick={() => this.props.lockDocument(item._id, this.props.history)}
                    >
                    <Icon type="lock" />
                  </Col>
                )
              }
              <Col
                xs={4} sm={2} md={1} lg={1} xl={1}
                className="list-item-col"
                onClick={() => this.props.deleteDocument(item._id, this.props.history)}
                >
                <Icon type="delete" />
              </Col>
            </Row>
          </List.Item>
        )}
      />
    );
  }
}

function mapStateToProps({ documentList }){
  return { documentList };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteDocument,
    lockDocument,
    unlockDocument
  }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (DocumentList));
