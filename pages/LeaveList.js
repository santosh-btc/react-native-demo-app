import React,{Component} from 'react';
import { Container, Content, List, ListItem, Thumbnail,Header, Title, Button, Icon, Text} from 'native-base';
import Healper from './Healper.js'


export default class LeaveList extends Component {

    _navigate(name,id) {
      this.props.navigator.push({
        name: name,
        passProps: {
          id: id
        }
      })
    }

    render() {
      return(
            <Container>
            {this.props.data ? <Content>
              <List dataArray={this.props.data}
                    renderRow={(approved) =>
                      <ListItem button onPress={() => this._navigate('LeaveDetail',approved.id)}>
                        <Thumbnail square size={50} source={{uri: 'https://cdn1.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png' }} />
                        <Text style={{fontSize:17,fontWeight:'bold'}}>{approved.reason}</Text>
                        <Text>{approved.leave_type}</Text>
                        <Text style={{fontSize:12}}>{Healper.dateFormat(approved.updated_at)}</Text>
                      </ListItem>
                    }>
              </List>
          </Content> : <Content><Text>No Request Available.</Text></Content>}
        </Container>
        );
    }
}
