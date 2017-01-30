import React,{Component} from 'react';
import {
  StyleSheet,AsyncStorage,
  View,TextInput,RefreshControl,
  ScrollView,Navigator
} from 'react-native';
import { Spinner, Container, Icon, Content, List, ListItem, Thumbnail, Text,InputGroup,Button,Input } from 'native-base';

let d = new Date();
let curr_date = d.getDate();
let curr_month = d.getMonth() + 1;
let curr_year = d.getFullYear();
let date = curr_date + "-" + curr_month + "-" + curr_year

export default class Holiday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token:'',
      refreshing: false,
      results:{
        holidays:[]
      }
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
          this.getHolidays();
       }
     });
  }

  async getHolidays(){
    this.setState({
       loading: true
   });
   fetch('http://192.168.0.105:3000/holidays.json/?access_token='+this.state.access_token, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) =>
    {
      console.log(responseData);
       this.setState({ results:responseData.holidays, loading: false, refreshing: false});
    })
    .catch((error) => {
          this.setState({
              loading: false
          });
          console.error(error);
    });
   }
    render() {
        return (
            <ScrollView tabLabel="md-calendar">
              <Container>
                <Content>
                  {(this.state.loading) ? 
                    <Spinner color='#2196F3'/> :
                     <List dataArray={this.state.results}
                      refreshControl={
                                      <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.getHolidays.bind(this)}
                                      />}
                      renderRow={(holidays) =>
                          <ListItem>
                            {(holidays.holiday_date > date) ? <Text style={{color: 'gray'}}>{holidays.name}</Text>  : <Text>{holidays.name}</Text>}
                            <Text note>{holidays.date}</Text>

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
