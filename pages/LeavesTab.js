import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,Navigator,AsyncStorage
} from 'react-native';
import {Spinner} from 'native-base'
import ScrollableTabView from 'react-native-scrollable-tab-view';


import Tabs from './tabs';
import Requests from './Requests.js';
import LeaveList from './LeaveList.js';

export default class LeavesTab extends Component{

  constructor(props) {
    super(props);
    this.state = {
      access_token:'',
      leaves_for_approval:{},
      approved_requests:{},
      pendding_requests:{},
      rejected_requests:{}
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
        this.getLeaveDetails();
     }
    });
  }

  async getLeaveDetails(){
    this.setState({
       loading: true
   });
   fetch('http://192.168.0.105:3000/sign_offs.json/?access_token='+this.state.access_token, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) =>
    {
       this.setState({
                       leaves_for_approval: responseData.leaves_for_approval,
                       approved_requests: responseData.approved_requests,
                       pending_requests: responseData.pending_requests,
                       rejected_requests: responseData.rejected_requests,
                         loading: false});
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
    let Tabname = ["Requests","Approved","Panding","Rejected"];
    return (
          <ScrollableTabView
          initialPage={this.props.index}
          renderTabBar={() => <Tabs name={Tabname} navigator={this.props.navigator} showHeader={true} refresh={this.getToken.bind(this)}/>}
          >
          <ScrollView tabLabel="md-calendar">
            <Requests tabLabel='Requests' navigator={this.props.navigator} data={this.state.leaves_for_approval}/>
          </ScrollView>
          <ScrollView tabLabel="md-checkbox">
            <LeaveList tabLabel='Approved' navigator={this.props.navigator} data={this.state.approved_requests}/>
          </ScrollView>
          <ScrollView tabLabel="md-time">
            <LeaveList tabLabel='Pending' navigator={this.props.navigator} data={this.state.pending_requests} />
          </ScrollView>
          <ScrollView tabLabel="md-close-circle">
            <LeaveList tabLabel='Rejected' navigator={this.props.navigator} data={this.state.rejected_requests}/>
          </ScrollView>
        </ScrollableTabView>

  );
  }
}

const styles = StyleSheet.create({
});
