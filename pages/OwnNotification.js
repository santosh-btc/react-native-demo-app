import React,{Component} from 'react';
import { Container, Content, List, ListItem, Thumbnail,Header, Title, Button, Icon, Text} from 'native-base';


export default class OwnNotification extends Component {
  
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
              <Content>
                <List dataArray={this.props.data}
                      renderRow={(approved) =>
                        <ListItem button onPress={() => this._navigate('LeaveDetail',approved.id)}>
                          <Thumbnail square size={50} source={{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAgzAAAAJDZjMmIxODk0LTNjNDktNDgyMi04OTY3LTNiMDU0YWE0ZjQwMw.jpg' }} />
                          <Text>{approved.leave_type}</Text>
                          <Text note>{approved.reason}</Text>
                        </ListItem>
                      }>
                </List>
            </Content>
        </Container>
        );
    }
}