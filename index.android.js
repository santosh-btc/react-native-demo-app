
 import React, { Component } from 'react';
 import Login from './pages/login.js';
 import Profile from './pages/Profile.js';

 import Drawer from 'react-native-drawer';
 import RequiresConnection from 'react-native-offline-mode';

 import LeavesTab from './pages/LeavesTab.js'
 import Leaves from './pages/Leaves.js';
 import Notification from './pages/Notification.js';
 import LeaveDetail from './pages/LeaveDetail.js';
 import RequestedLeaveList from './pages/Requested_leaves_list.js';
 import LeaveChat from './pages/LeaveChat.js'
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator,BackAndroid
 } from 'react-native';
var navigator;
export default class HPSReactNative extends Component {


  renderScene(route, navigator) {
  	if(route.name == 'Login') {
    	return <Login navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Profile') {
      return <Profile navigator={navigator} {...route.passProps} route={route} />
    }
    if(route.name == 'LeavesList') {
      return <LeavesTab navigator={navigator} {...route.passProps} route={route} />
    }
    if(route.name == 'Leaves') {
      return <Leaves navigator={navigator} {...route.passProps} route={route} />
    }
    if(route.name == 'Profile') {
      return <Profile navigator={navigator} {...route.passProps} route={route} />
    }
    if(route.name == 'Notification') {
      return <Notification navigator={navigator} {...route.passProps} route={route} />
    }
    if(route.name == 'LeaveDetail') {
      return <LeaveDetail navigator={navigator} {...route.passProps} route={route} />
    }
    if(route.name == 'LeaveChat') {
      return <LeaveChat navigator={navigator} {...route.passProps} route={route} />
    }
  }

  render() {
    return (
      <Navigator
      	style={{ flex:1 }}
        ref={(nav) => { navigator = nav; }}
        initialRoute={{ name: 'Login' }}
        renderScene={ this.renderScene }
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
      />
    );
  }
}

class OfflineClass extends Component {
  render() {
    return (
      <Text>Oh snap! You're offline!</Text>
    )
  }
}

const offlineFunction = () => 
    <View style={{flex:1,flexDirection:'column',justifyContent:'center', alignItems:'center',padding:30}}>
      <Text style={{fontSize:17,fontWeight:'bold'}}>
        No Internet Available.Please check your Internet connection.
      </Text>
    </View>

AppRegistry.registerComponent('HPSReactNative', () => RequiresConnection(HPSReactNative, offlineFunction));

