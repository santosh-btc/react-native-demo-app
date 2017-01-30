import React,{Component} from 'react';
import { Spinner, Container, Content, List, ListItem, InputGroup,
         Input, Icon, Text, Picker, Button ,
         Thumbnail
       } from 'native-base';

import {AsyncStorage} from 'react-native'
import FCM from "react-native-fcm";

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: true,
      email: '',
      password: '',
      fcm_token: ""

    };

  }
  componentDidMount () {

    FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      this.setState({fcm_token:token});
    });

    this.checkLogin();
  }

  async checkLogin(){
    AsyncStorage.getItem('current_user', (err, result) => {
      current_user= JSON.parse(result)
      if (result!=null){
        this._navigate('Leaves',0);
      }
      else
      {
        this.setState({login: false});
      }
    });
  }
  _navigate(name, index) {
    this.props.navigator.push({
      name: name,
      passProps: {
        index: index
      }
    })
  }

  async login(email,password){

    let response = await fetch('http://192.168.0.105:3000/users/sign_in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:{
          email: this.state.email,
          password: this.state.password,
          fcm_token:this.state.fcm_token
        }
      })
    });

    let res = await response.json();

    if (res.success==true)
    {
      AsyncStorage.setItem('current_user', JSON.stringify(res));
      this._navigate('Leaves',0)
    }
    else
      alert('Invalid email and password');
  }

  render() {
    return (
      <Container >
        {(this.state.login)? <Content style={{top:200}}><Spinner color='#2196F3'/></Content>:
        <Content>
          <List style={{ alignSelf: 'center', marginTop: 150, marginBottom: 20,width:300 }} >
            <Thumbnail size={80} style={{ alignSelf: 'center',marginBottom: 20}} source={{uri:'https://cdn-images-1.medium.com/max/139/1*Q5ya0DSeneWh-Nieprl15w.png'}} />
            <ListItem >
              <InputGroup iconRight >
                  <Input placeholder='Email....' onChangeText={(text) => {this.setState({email: text})}}/>
              </InputGroup>
            </ListItem>
            <ListItem >
              <InputGroup iconRight >
                  <Input placeholder='Password' secureTextEntry={true} onChangeText={(text) => {this.setState({password: text})}}/>
              </InputGroup>
            </ListItem>
            <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20,width:100 }} onPress={ () => this.login() }>
             Login
            </Button>
          </List>
          </Content>
        }
     </Container>
    );
  }
}
