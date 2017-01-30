import React,{Component} from 'react';
import { Container, Content, List, ListItem, InputGroup,
         Input, Icon, Text, Button,Picker,Card,CardItem,Spinner, Header, Title } from 'native-base';
import {AsyncStorage,ToastAndroid,Modal,View,TouchableHighlight} from 'react-native';
import DatePicker from 'react-native-datepicker'
import FloatingLabel from 'react-native-floating-labels';
const Item = Picker.Item;

import ItemCheckbox from 'react-native-item-checkbox';
import Healper from './Healper.js'
import PushController from "./PushController";


export default class RequestLeave extends Component {
    constructor(props) {
      super(props);
      this.state = {
          modalVisible: false,
          selected_user: '1',
          selected_user_list:[],
          m_id:[],
          user_name:[],
          leave_duration: '1',
          access_token:'',
          leave_type: '1',
          send_to:'',
          reason:'',
          from: new Date(),
          end: new Date(),
          leave_types:[],
          users:[]
      };
    }

    componentWillMount () {
      this.getToken();
    }

    _navigate(name) {
      this.props.navigator.push({
        name: name,
        passProps: {
          name: name
        }
      })
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    async getToken(){
       AsyncStorage.getItem('current_user', (err, result) => {
         current_user= JSON.parse(result)

         if (result!=null){
            this.setState({access_token:current_user.user.access_token});
            this.getLeaveType();
            this.getUsers();
         }
       });
    }

    async getLeaveType(){

      fetch('http://192.168.0.105:3000/sign_off_types.json/?access_token='+this.state.access_token, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) =>
        {

          this.setState({ leave_types:responseData.sign_off_types, refreshing: false});

        })
       .done(() => {

       });
    }

    async getUsers(){

      fetch('http://192.168.0.105:3000/sign_offs/new.json?access_token='+this.state.access_token, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) =>
        {

          this.setState({ users:responseData.users, refreshing: false});

        })
       .done(() => {

       });
    }

    async sendLeaveRequest(){

      this.setState({
        loading: true
      });

      let response = await fetch('http://192.168.0.105:3000/sign_offs', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',

       },
       body: JSON.stringify({
         sign_off:{
           requestee_ids: this.state.selected_user_list.toString(),
           sign_off_type_id: this.state.leave_type,
           half_full_leave:this.state.leave_duration,
           date_from:this.state.from,
           date_to:this.state.end,
           reason:this.state.reason,
         },
         'access_token': this.state.access_token,
       })
      });
      let res = await response.json();
      console.log(res);
      if (res.success==true){
        this.setState({
          loading: false
        });
        ToastAndroid.show('Leave Request Sent Successfully',ToastAndroid.LONG,ToastAndroid.CENTER,);
      }
      else{
        alert('Something went wrong try again');
      }
    }

    onLeaveTypeChange(value: string) {
      this.setState({
          leave_type: value,
      });
    }

    onValueChangeDuration(value: string) {
      this.setState({
          leave_duration: value,
      });
    }

    onUserChange(value) {
      if (this.state.selected_user_list.indexOf(value) < 0)
          this.state.selected_user_list.push(value);
        else
          this.state.selected_user_list.splice(this.state.selected_user_list.indexOf(value),1);

        this.setState({
            selected_user: value,
            selected_user_list: this.state.selected_user_list
        });
    }


    onCheck(id) {
      this.onUserChange(id);
    }

    onUncheck(id){
      this.onUserChange(id);
    }

    render() {
        return (
          <Container>
            <Content>
              {(this.state.loading)? <Spinner color='#2196F3' style={{top:100}}/>:
                    <View>
                    <PushController/>
                      <List>
                        <ListItem button onPress={() => {
                              this.setModalVisible(true)
                            }}>
                          <Text>Send to ({this.state.selected_user_list.length})</Text>
                          <Modal
                            animationType={"slide"}
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => this.setState({modalVisible: false})}
                            >
                           <Container>
                           <Header backgroundColor="#2196F3">
                            <Button transparent onPress = {()=> this.setState({modalVisible: false})}>
                              <Icon name='ios-arrow-back' />
                            </Button>
                               <Title>Send To ({this.state.selected_user_list.length})</Title>
                           </Header>
                           <Content>
                            <List dataArray={this.state.users}
                              renderRow={(leave_type) =>
                                  <ListItem>
                                     <ItemCheckbox
                                        default={(this.state.selected_user_list.indexOf(leave_type.id) > -1) ? true : false}
                                        onCheck={this.onCheck.bind(this, leave_type.id)}
                                        onUncheck={this.onUncheck.bind(this, leave_type.id)}
                                        size={30}
                                        color='#2196F3'
                                      />
                                      <Text style={{left:5}}>{leave_type.email}</Text>
                                  </ListItem>
                                }>
                            </List>
                              </Content>
                            </Container>
                          </Modal>
                        </ListItem>
                        <ListItem>
                            <InputGroup >
                                <Input stackedLabel label="Leave Resaon"
                                onChangeText={(text) => {this.setState({reason: text})}}/>
                            </InputGroup>
                        </ListItem>

                        <ListItem iconLeft>
                            <Icon name="md-list-box" style={{ color: '#0A69FE' }} />
                            <Text>Leave Type</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dropdown"
                              selectedValue={this.state.leave_type}
                              onValueChange={this.onLeaveTypeChange.bind(this)} >
                              {this.state.leave_types.map((l,i) => {return <Item value={l.id} label={l.sign_off_type_name} key={i}  /> })}
                            </Picker>
                        </ListItem>
                        <ListItem iconLeft>
                            <Icon name="md-list-box" style={{ color: '#0A69FE' }} />
                            <Text>Leave Duration</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dropdown"
                              selectedValue={this.state.leave_duration}
                              onValueChange={this.onValueChangeDuration.bind(this)} >

                                <Item label="Half Day" value="half" />
                                <Item label="Full Day" value="full" />
                                <Item label="Multiple Day" value="muliple" />
                            </Picker>
                        </ListItem>
                        <ListItem >
                         <Text>From</Text>
                          <DatePicker
                            style={{width: 150,left:22}}
                            date={this.state.from}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36
                              }
                            }}
                            onDateChange={(date) => {this.setState({from: date})}}
                          />
                        </ListItem>
                        <ListItem>
                           <Text>End</Text>
                            <DatePicker
                              style={{width: 150,left:28}}
                              date={this.state.end}
                              mode="date"
                              placeholder="select date"
                              format="YYYY-MM-DD"
                              minDate={new Date()}
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              customStyles={{
                                dateIcon: {
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  marginLeft: 0
                                },
                                dateInput: {
                                  marginLeft: 36
                                }
                              }}
                              onDateChange={(date) => {this.setState({end: date})}}
                            />
                        </ListItem>

                        <ListItem>
                            <InputGroup >
                                <Input multiline={true} stackedLabel label="Description"
                                />
                            </InputGroup>
                        </ListItem>
                    </List>
                    <Button disabled={Healper.validate(this.state.reason,this.state.selected_user_list)} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                    onPress={() => this.sendLeaveRequest()}>
                        Send Leave Request
                    </Button>
                  </View>}
                </Content>
            </Container>
        );
    }
}
