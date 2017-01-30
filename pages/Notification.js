import React,{Component} from 'react';
import { Container, Content,Header, Title, Button, Icon, Tabs, Spinner} from 'native-base';

import {
  AsyncStorage,
  StatusBar,
  RefreshControl
} from 'react-native';

import OwnNotification from './OwnNotification.js';
import OtherNotification from './OtherNotification.js';

export default class Notification extends Component {

    constructor(props) {
      super(props);
      this.state = {
        access_token:'',
        refreshing: false,
        own_notification:{},
        other_notification:{},
      };
    }

    componentWillMount () {
      this.getToken();
    }

    async getToken(){
      AsyncStorage.getItem('current_user', (err, result) => {
       current_user= JSON.parse(result)
       if (result!=null){
          this.setState({access_token:current_user.user.access_token});
          this.getNotifications();
       }
      });
    }

    async getNotifications(){
      this.setState({
         loading: true
     });
     fetch('http://192.168.0.105:3000/fetch_new_notifications.json/?access_token='+this.state.access_token, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) =>
      {
         this.setState({ own_notification: responseData.own_requests_notifications,
                         other_notification: responseData.others_requests_notifications,
                         loading: false,refreshing: false});
      })
      .catch((error) => {
        this.setState({
            loading: false
        });
        console.error(error);
        });
     }

    _navigate(name) {
      this.props.navigator.push({
        name: name,
        passProps: {
          name: name
        }
      })
    }
    
    render() {
      return(
        <Container>
          <Header backgroundColor="#2196F3">
               <Button transparent onPress={() => {this.props.navigator.pop()}}>
                   <Icon name='ios-arrow-back' />
               </Button>
               <Title>Notification</Title>
          </Header>
          <StatusBar
            backgroundColor="#2196F3"
            barStyle="light-content"
          />
          <Content
            refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.getNotifications.bind(this)}
                          />}>
            {(this.state.loading) ? <Spinner color='#2196F3'/> :
              <Tabs>
                  <OwnNotification tabLabel='Own' navigator={this.props.navigator} data={this.state.own_notification}/>
                  <OtherNotification tabLabel='Other' navigator={this.props.navigator} data={this.state.other_notification} />
              </Tabs>
            }
          </Content>
       </Container>
        );
    }
}
