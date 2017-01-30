import React,{Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Menu from './menu.js';
import HomeTabs from './HomeTabs.js';
import DrawerBar from './drawer.js';

import {
  Text,View, StyleSheet, ToolbarAndroid,DrawerLayoutAndroid,
  TouchableHighlight,ScrollView,Navigator
} from 'react-native';


export default class Leaves extends Component {

  renderScene() {
    return (
      <HomeTabs navigator={this.props.navigator} index={this.props.index} />
    );
  }

  render() {
      return (
        <DrawerBar data={this.renderScene()} navigator={this.props.navigator}/>
      );
  }
}
