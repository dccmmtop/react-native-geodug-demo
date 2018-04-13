import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, TextInput, Button } from "react-native";
import { NavigationActions } from 'react-navigation';
import CustomButton from '../components/CustomButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login_name: '',
      password: '',
      canClick: true
    }
  }

  render() {
    return (
      <View style={styles.layout}>
        <Image source={require('../assets/imgs/logo.jpg')} resizeMode="contain" style={{width: 100, height: 80}} ></Image>
        <Text style={styles.title}>地磁调试平台</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="用户名"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={(login_name) => this.setState({login_name})}
          />
          <TextInput
            placeholder="密码"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({password})}
          />
          <CustomButton
            text="登录"
            type="default"
            disabled={!this.state.canClick}
            onPress={() => this.handleLogin()}
            btnStyle={{marginTop: 50, width: Dimensions.get('window').width - 80}}
          />
        </View>
      </View>
    )
  }

  handleLogin() {
    this.setState({
      canClick: false
    });
    
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Index' })],
    });

    try {
      this.props.navigation.dispatch(resetAction);
    } catch (error) {
      console.warn(error);
      this.setState({
        canClick: true
      })
    }
  }
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    paddingTop: 48,
  },
  title: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginTop: 20, 
    color: '#000'
  },
  form: {
    alignItems: 'center',
    flex: 1,
    marginTop: 10
  },
  input: {
    padding: 0,
    paddingLeft: 20,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    width: Dimensions.get('window').width - 80,
    marginTop: 30,
  }
})
