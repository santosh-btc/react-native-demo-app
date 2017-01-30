import React,{Component} from 'react';
import { Container, Content,Header,Button,Icon,Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import {View,Dimensions,Text,AsyncStorage} from 'react-native'

const window = Dimensions.get('window');

export default class LeaveChat extends Component {

    constructor(props) {
      super(props);
      this.onSend = this.onSend.bind(this);
      this.state = {
        messages: [],
        access_token:'',
        user_name:'',
        u_id:''

      };
    }

    _navigate(name,id) {
      this.props.navigator.push({
        name: name,
        passProps: {
          id: id
        }
      })
    }

    componentDidMount() {
      this.timer = setInterval(()=> this.getMessages(), 1000)
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }

    componentWillMount () {
      this.getToken();
    }

    async getToken(){
       AsyncStorage.getItem('current_user', (err, result) => {
         current_user= JSON.parse(result)
         console.log(current_user);
         if (result!=null){
            this.setState({ access_token:current_user.user.access_token,
                            u_id:current_user.user.id,
                            user_name: current_user.user.name});
            this.getMessages();
         }
       });
    }

    async getMessages(){
      this.setState({
        loading: true
      });
     fetch('http://192.168.0.105:3000/sign_offs/'+this.props.id+'.json/?access_token='+this.state.access_token, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) =>
      {
         this.setState({ messages: responseData.comments, loading: false});
         console.log(responseData);
      })
      .catch((error) => {
          console.error(error);
      });
    }

    async postMessage(msg){
       let response = await fetch('http://192.168.0.105:3000/sign_offs/'+this.props.id+'/comments', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',

       },
       body: JSON.stringify({
         comment:{
           message: msg,
         },
         'access_token': this.state.access_token,
       })
      });
    }

    onSend(messages = []) {
     this.postMessage(messages[0].text);
     this.getMessages();
    }

    render() {
      return(
          <Container>
            <Content>
              <Header backgroundColor="#2196F3">
                <Button transparent onPress={() => {this.props.navigator.pop()}}>
                    <Icon name='ios-arrow-back' />
                </Button>
                <Title>{this.state.user_name}</Title>
              </Header>
            </Content>
            <View style={{flex: 1,height:window.height-140}}>
               <GiftedChat
                bottomOffset={0}
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                  _id: this.state.u_id,
                }}
              />
            </View>
          </Container>
        );
    }
}
