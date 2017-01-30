import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,RefreshControl
} from 'react-native';
import IconTabs from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import { Container, Header, Title, Button,Icon } from 'native-base';

const Tabs = React.createClass({
  tabIcons: [],
  getInitialState() {
    return { access_token:'' };
  },

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
    });
  },


  render() {
      return (
      <View>
      {this.props.showHeader ? <Header backgroundColor="#2196F3">
          <Button transparent onPress={() => this.props.navigator.pop()}>
              <Icon name='ios-arrow-back' />
          </Button>
          <Title>Requested Leaves</Title>
          <Button transparent onPress={() => this.props.refresh()}>
            <Icon name='ios-refresh' />
        </Button>
      </Header> : false }

      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i,) => {
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <IconTabs
              name={tab}
              size={20}
              color={this.props.activeTab === i ?  'rgb(255,255,255)' : 'rgb(189, 224, 250)'}
              ref={(icon) => { this.tabIcons[i] = icon; }}
            />
          <Text style={{fontWeight:'bold', fontSize:10, color:this.props.activeTab === i ? 'rgb(255,255,255)' : 'rgb(189, 224, 250)'}}>{`${this.props.name[i]}`}</Text>
          </TouchableOpacity>;
        })}
      </View>
      </View>
    );
    },
  });

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#2196F3',
  },
});

export default Tabs;
