import React, { Component } from 'react';
import {  View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class SearchList extends Component {
  render() {
    const {car_park_name, address} = this.props.data;
    return (
      <TouchableOpacity activeOpacity={1} style={styles.container} {...this.props} >
        <Image source={require('../assets/imgs/park.png')} style={styles.icon} />
        <View style={styles.content} >
          <Text numberOfLines={1}  style={styles.park} >{car_park_name}</Text>
          <Text numberOfLines={1} >{address}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  content: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  park: {
    fontSize: 16,
    color: '#000',
  }
})