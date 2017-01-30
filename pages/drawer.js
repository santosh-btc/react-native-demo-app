import React,{Component} from 'react';
import Drawer from 'react-native-drawer'
import Menu from './menu.js';
import {
  Text,View, StyleSheet, ToolbarAndroid,DrawerLayoutAndroid,
  TouchableHighlight,ScrollView,Navigator,StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class DrawerBar extends Component {

  state={
    drawerOpen: false,
    drawerDisabled: false,
    data:''
  };
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  _onActionSelected = (position) => {
    this.props.navigator.push({
        name: 'Notification',
        passProps: {
          name: 'name'
        }
    })
  };
  render() {
      return (
        <Drawer
          ref={(ref) => this._drawer = ref}
          type="overlay"
          content={
            <Menu closeDrawer={this.closeDrawer} navigator={this.props.navigator}/>
          }
          acceptTap
          acceptPan
          tapToClose={true}
          styles={{ main: { shadowColor: '#ff6f00', shadowOpacity: 0.8, shadowRadius: 3}}}
          onOpen={() => {
            console.log('onopen')
            this.setState({drawerOpen: true})
          }}
          onClose={() => {
            console.log('onclose')
            this.setState({drawerOpen: false})
          }}
          captureGestures={true}
          tweenDuration={100}
          panThreshold={0.25}
          panOpenMask = {0.01}
          disabled={this.state.drawerDisabled}
          openDrawerOffset={0.2} 
          closedDrawerOffset={() => 0}
          elevation = {200}
          negotiatePan
          translucent={true}
        >
          <View style={{flex:1, flexDirection: 'column'}} >
            <View style={{backgroundColor: '#2196F3',elevation: 3,borderTopColor:'black',borderTopWidth:0.2}} >
              <Icon.ToolbarAndroid
                navIcon={require('../images/menu.png')}
                title="Leave-Mgt"
                titleColor="white"
                actions={[{title:'Notifications', iconName: 'ios-notifications', iconSize: 30, show: 'always'}]}
                onIconClicked={() => {this.openDrawer()}}
                onActionSelected={this._onActionSelected}
              >

                <View style={{height: 56, flexDirection: 'row', alignItems: 'center'}}>
                </View>
              </Icon.ToolbarAndroid>
            </View>
            <StatusBar
             backgroundColor="#2196F3"
             barStyle="light-content"
            />
            {this.props.data}
          </View>
        </Drawer>
      );
  }
}
