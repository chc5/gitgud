import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// UI Imports
import { Layout, List } from 'antd';
import NavBar from '../NavBar/NavBar';
const { Header, Content } = Layout;

class ComplaintManager extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      data: [
        'Complaint # 1: hohoho.txt',
        'Complaint # 2: pohoho.txt',
        'Complaint # 3: fohoho.txt',
        'Complaint # 4: gohoho.txt',
        'Complaint # 5: zohoho.txt',
      ]
    }
  }

  render(){
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            Complaint Manager
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <List
              size="large"
              bordered
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item
                  onClick={() => this.props.history.push(`/complaints/${item}`)}
                  >
                  {item}
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// function mapStateToProps({  }){
//   return {  };
// }
//
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({  }, dispatch);
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps) (ComplaintManager));
export default withRouter(ComplaintManager);
