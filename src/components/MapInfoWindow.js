import React, { Component } from 'react';
import {  View, Text, Image, StyleSheet, Button, Animated, Dimensions, Easing, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';

export default class MapInfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideAnim: new Animated.Value(-140)
    };
  }

  render() {
    const {
      car_park_name,
      parking_space_num,
      geom_num,
      address
    } = this.props.data;

    return (
      <Animated.View 
        style={[styles.animate, {
          bottom: this.state.slideAnim
        }]}
      >
        <TouchableOpacity style={styles.location} onPress={() => this.locate()} >
          <Image source={require('../assets/imgs/location.png')}  style={styles.locationIcon} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>{car_park_name}</Text>
          <View style={styles.center}>
            <Text style={styles.text}>
              车位数：{parking_space_num}
            </Text>
            <Text style={styles.text}>
              地磁数：{parking_space_num}
            </Text>
          </View>
          <Text style={styles.text}>地址：{address}</Text>
          <CustomButton 
            text="查看地磁" 
            btnStyle={styles.btn} 
            onPress={() => this.navgateToGeoList()} 
          />
        </View>
      </Animated.View>
    );
  }

  navgateToGeoList() {
    this.props.onSkip();
  }

  locate() {
    this.props.onLocate();
  }

  showInfoWindow() {
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: 0,
        // easing: Easing.back,
        duration: 300
      }
    ).start();
  }

  hideInfoWindow() {
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: -146,
        duration: 300
      }
    ).start();
  }
}

const styles = StyleSheet.create({
  animate: {
    position: 'absolute'
  },
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 5
  },
  title: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#000'
  },
  center: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    marginTop: 8
  },
  btn: {
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#409EFF'
  },
  location: {
    marginLeft: 10,
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5
  },
  locationIcon: {
    width: 20,
    height: 20
  }
})
