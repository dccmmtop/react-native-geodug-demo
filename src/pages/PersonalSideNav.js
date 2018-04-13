import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import CustomButton from '../components/CustomButton';

export default class PersonalSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canClick: true
    }
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image source={require('../assets/imgs/avatar.png')} style={styles.avatar} />
          </View>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold',}}>测试工程师</Text>
          <CustomButton
            text="退出登录"
            type="plain"
            disabled={!this.state.canClick}
            onPress={() => this.handleLogout()}
            btnStyle={styles.btn}
          />
        </SafeAreaView>
      </ScrollView>
    )
  }

  handleLogout() {
    this.setState({
      canClick: false
    });

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
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
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 40
  },
  avatar: {
    width: 70,
    height: 70
  },
  btn: {
    marginTop: 50, 
    width: 170,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  }
})