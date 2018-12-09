import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Layout, Row, Col } from 'antd';

import NavBar from '../NavBar/NavBar';
import "./Home.css";
const { Header, Content } = Layout;

class Home extends Component{
  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {this.props.userInfo
              ? (<span>Welcome, { this.props.userInfo.username }</span>)
              : (<span>Home</span>)
            }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Row gutter={16} className="row">
              <Col span={8}>
                <Card
                  className="card"
                  onClick={() => this.props.history.push(`/docs`)}
                  >
                  Search for Documents
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="card"
                  onClick={() => this.props.history.push(`/profiles`)}
                  >
                  Search for Users
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  className="card"
                  onClick={() => this.props.history.push(`/taboos`)}
                  >
                  Search for Taboo Words
                </Card>
              </Col>
            </Row>
            <Row gutter={16} className="row">
              <Col span={12}>
                <Card
                  className="card"
                  onClick={() => this.props.history.push(`/login`)}
                  >
                  Login
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  className="card"
                  onClick={() => this.props.history.push(`/signup`)}
                  >
                  Signup
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({ userInfo }){
  return { userInfo };
}

export default withRouter(connect(mapStateToProps) (Home));
