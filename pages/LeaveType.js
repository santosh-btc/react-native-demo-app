import React,{Component} from 'react';

import { Container, Icon, Content, List, ListItem,Badge,
         Thumbnail, Text, Spinner, Button, InputGroup,Input
       } from 'native-base';

import {
  StyleSheet,
  View,AsyncStorage,
  ScrollView,RefreshControl
} from 'react-native';

export default class LeaveType extends Component {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      access_token:'',
      results:{
        leave_types:[]
      },
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
          this.getLeaveType();
       }
     });
  }

  async getLeaveType(){
    this.setState({
      loading: true
    });

    fetch('http://192.168.0.105:3000/sign_off_types.json/?access_token='+this.state.access_token, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) =>
      {
        console.log(responseData);
        this.setState({ results:responseData.sign_off_types, refreshing: false, loading: false});
      })
     .done(() => {

     });

  }
    render() {
        return (
            <ScrollView tabLabel="md-time">
              <Container>
                  <Content>
                    {(this.state.loading)? 
                      <Spinner color='#2196F3'/> :
                      <List dataArray={this.state.results}
                         refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.getLeaveType.bind(this)}
                            />}
                        renderRow={(leave_type) =>
                            <ListItem>
                              <Thumbnail/>
                               <Text >{leave_type.sign_off_type_name}</Text>
                               <Text note>{leave_type.description}</Text>
                               <Badge info>{leave_type.no_of_days}</Badge>
                            </ListItem>
                          }>
                      </List>
                      }
                  </Content>
              </Container>
            </ScrollView>
        );
    }
}
