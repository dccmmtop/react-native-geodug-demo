import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions } from 'react-native';
import { MapView } from 'react-native-amap3d';

export default class ParkMap extends Component {
  static navigationOptions = {
    title: '停车场',
    headerStyle: {
      height: 48
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'center'
    }
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          coordinate={{
            latitude: 39.91095,
            longitude: 116.37296,
          }}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        />
      </View>
    );
  }
}
