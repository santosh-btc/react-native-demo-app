import React,{Component} from 'react';
import { Container, Content, List, ListItem, Thumbnail,Header, Title, Button, Icon, Text, Badge} from 'native-base';

import Healper from './Healper.js'


export default class Requests extends Component {

    _navigate(name,id) {
      this.props.navigator.push({
        name: name,
        passProps: {
          id: id,
          status:true
        }
      })
    }

    render() {
      return(
            <Container>
            {this.props.data ? <Content>
              <List dataArray={this.props.data}
                    renderRow={(Request) =>
                      <ListItem button onPress={() => this._navigate('LeaveDetail',Request.id)}>
                        <Text style={{fontSize:15,fontWeight:'bold'}}>{Request.username}</Text>
                        <Text >{Request.reason}</Text>
                        <Text style={{fontSize:12}}>{Healper.dateFormat(Request.created_at)}</Text>
                        
                        <Badge style={{ backgroundColor: Healper.changeStatusColor(Request.sign_off_status) }}>{Request.sign_off_status}</Badge>
                      </ListItem>
                    }>
              </List>
          </Content> : <Content><Text>No Leave Request Available.</Text></Content>}
        </Container>
        );
    }
}
