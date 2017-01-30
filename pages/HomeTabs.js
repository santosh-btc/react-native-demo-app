import React, {Component} from 'react';
import {
  View,
  ScrollView,Navigator
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Tabs from './tabs';
import LeaveType from './LeaveType.js'
import Holiday from './Holiday.js';
import RequestLeave from './RequestLeave.js';

export default class HomeTabs extends Component{

   render() {
    let Tabname = ["REQUEST LEAVE","LEAVE TYPE","HOLIDAYS"];
    return (
      <ScrollableTabView
        initialPage={this.props.index}
        renderTabBar={() => <Tabs name={Tabname} />}
      >
        <ScrollView tabLabel="md-checkbox">
          <RequestLeave navigator={this.props.navigator} />
        </ScrollView>

        <View tabLabel="md-time">
          <LeaveType/>
        </View>

        <View tabLabel="md-calendar">
          <Holiday />
        </View>

    </ScrollableTabView>
    );

  }
}
