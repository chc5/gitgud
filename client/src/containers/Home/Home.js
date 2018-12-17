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
              ? (<h2>Welcome, { this.props.userInfo.username }!</h2>)
              : (<h2>GitGud</h2>)
            }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {!this.props.userInfo
              ? (
                <Row gutter={16} className="row">
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card
                      className="card"
                      onClick={() => this.props.history.push(`/login`)}
                      >
                      Login
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Card
                      className="card"
                      onClick={() => this.props.history.push(`/signup`)}
                      >
                      Signup
                    </Card>
                  </Col>
                </Row>
              )
              : (
                <Row gutter={16} className="row">
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card
                      className="card"
                      onClick={() => this.props.history.push(`/docs`)}
                      >
                      Search for Documents
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card
                      className="card"
                      onClick={() => this.props.history.push(`/profiles`)}
                      >
                      Search for Users
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card
                      className="card"
                      onClick={() => this.props.history.push(`/taboos`)}
                      >
                      Search for Taboo Words
                    </Card>
                  </Col>
                </Row>
              )
            }
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
