import React,{Component} from 'react';

import { Container, Content, List, ListItem, Text, Icon, Badge, Thumbnail } from 'native-base';

import {
  View,Image,AsyncStorage
} from 'react-native'
export default class ControlPanel extends Component {
  static propTypes = {
    closeDrawer: React.PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      user_name:''
    };
  }

  componentWillMount () {
    this.getUserDetail();
  }

  _navigate(name) {
    this.props.navigator.push({
      name: name,
    })
  }

  async getUserDetail()
  {
    AsyncStorage.getItem('current_user', (err, result) => {
       current_user= JSON.parse(result)
       console.log(current_user);
       if (result!=null){
          this.setState({user_name:current_user.user.name});
       }
     });
  }

  logout(){
    AsyncStorage.removeItem('current_user', (err, result) => {
      this._navigate('Login',0);
    });
  }

  render() {
    let {closeDrawer} = this.props
    return (
     <Container backgroundColor='white'>
      <Content>
        <View style={{flex:1,flexDirection:'column', justifyContent:'center', alignItems:'center',padding:30}}>
          <Image source={{uri:'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png'}} style={{width: 50, height: 50,borderRadius: 25}}/>
          <Text style={{top:10}}>{this.state.user_name}</Text>
        </View>
        <List>
          <ListItem iconLeft button onPress={ () => this._navigate('Profile',0) }>
              <Icon name="ios-contact" style={{ color: '#0A69FE' }} />
              <Text>Profile</Text>
          </ListItem>
          <ListItem iconLeft button onPress={ () => this._navigate('LeavesList',0) }>
              <Icon name="ios-mail-outline" style={{ color: '#0A69FE' }} />
              <Text>Requested Leaves</Text>
          </ListItem>
          <ListItem iconLeft button onPress={ () => this._navigate('Notification',0) }>
              <Icon name="ios-notifications" style={{ color: '#0A69FE' }} />
              <Text>Notifications</Text>
          </ListItem>
          <ListItem iconLeft button onPress={ () => this.logout() }>
              <Icon name="md-log-out" style={{ color: '#0A69FE' }} />
              <Text>Logout</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
    )
  }
}
