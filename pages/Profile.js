import React,{Component} from 'react';
import ActionButton from 'react-native-action-button';
import { Spinner, Container, Content, List, ListItem, Thumbnail, Text, Badge, Card, CardItem, Header, Button, Icon, Title } from 'native-base';

import {AsyncStorage} from 'react-native';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      access_token:'',
      user_name:'',
      user:{},
      profile:{},
      leave:{}
    };
  }
  _navigate(name, index) {
    this.props.navigator.push({
      name: name,
      passProps: {
        index: index
      }
    })
  }

  componentWillMount () {
    this.getToken();
  }

  async getToken(){
     AsyncStorage.getItem('current_user', (err, result) => {
       current_user= JSON.parse(result)
       if (result!=null){
          this.setState({access_token:current_user.user.access_token,
                         id:current_user.user.id,
                         user_name: current_user.user.name});
          this.getProfileDetails();
       }
     });
  }

  async getProfileDetails(){
    this.setState({
      loading: true
    });
   fetch('http://192.168.0.105:3000/profiles/'+this.state.id+'.json/?access_token='+this.state.access_token, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) =>
    {
          console.log(responseData);
            this.setState({ user: responseData.user,
                        profile: responseData.profile,
                        leave: responseData.leave_counts,
                        loading: false});
      }) 
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return(
           <Container>
              <Header backgroundColor="#2196F3">
                <Button transparent onPress={() => this.props.navigator.pop()}>
                    <Icon name='ios-arrow-back' />
                </Button>
                <Title>{this.state.user_name}</Title>
              </Header>
            <Content>
            {(this.state.loading) ? <Spinner color='#2196F3'/> :
              <List>
                  <ListItem>
                    <Thumbnail circle size={80} source={{uri: 'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }} />
                    <Text>{this.state.user.name}</Text>
                    <Text note>{this.state.user.designation}</Text>
                  </ListItem>

                  <ListItem itemDivider>
                    <Text>Leave Details</Text>
                  </ListItem> 

                  <ListItem>
                    <Text>Leave Balance:</Text>
                    <Badge primary>{this.state.leave.remaingin_leaves}</Badge>
                  </ListItem>
                  <ListItem>
                    <Text>Leave Requests:</Text>
                    <Badge>{this.state.leave.pending_request_counts}</Badge>
                  </ListItem>
                  <ListItem>
                    <Text >Taken Leave:</Text>
                    <Badge success>{this.state.leave.approved_request_counts}</Badge>
                  </ListItem>

                  <ListItem itemDivider>
                    <Text>Job Description</Text>
                  </ListItem> 

                  <ListItem>
                    <Text>Joining Date: </Text>
                    <Text note>{this.state.profile.joining_date}</Text>
                  </ListItem>
                  <ListItem>
                    <Text>Skills: </Text>
                    <Text note>{this.state.profile.skills}</Text>
                  </ListItem>
              </List>}
           </Content>
        </Container>
    );
  }
}
