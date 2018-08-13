import React, { Component } from 'react';
import './App.css';

import {
  Layout,
  Row,
  Button,
  Card,
  Avatar,
} from 'antd';

const { Header, Content } = Layout;
const { Meta } = Card;

const liff = window.liff;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: undefined,
      image: '',
      name: '',
      message: '',
    }

    this.initialize = this.initialize.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  initialize() {
    liff.init(async (data) => {
      let profile = await liff.getProfile();

      this.setState({
        id : profile.userId,
        name : profile.displayName,
        image : profile.pictureUrl,
        message : profile.statusMessage
      });
    });
  }

  closeApp(event) {
    event.preventDefault();
    liff.sendMessages([
      {
        type: 'text',
        text: "See you soon, Bye~!"
      }
    ]).then(() => {
      liff.closeWindow();
    });
  }

  render() {
    const { id, name, image, message } = this.state;

    return (
      <div className="App">
        <Layout>
          <Header>
            <h3 style={{ color: 'white' }}>My Profile</h3>
          </Header>
          <Content style={{ marginTop: 20, marginBottom: 20 }}>
            <Row style={{ margin: 20, textAlign: 'center' }}>
              <Card>
                <Meta
                  avatar={<Avatar src={ image || '' } />}
                  title={ `${name} (id: ${id})` || '' }
                  description={ message || '' }
                />
              </Card>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Button type="danger" onClick={this.closeApp}>Close App</Button>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
