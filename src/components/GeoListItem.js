import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { getStateDesc } from '../utils/tools';

export default class GeoListItem extends Component {
  render() {
    const data = this.props.data;

    return (
      <TouchableOpacity activeOpacity={1} style={styles.container} {...this.props} >
        <View style={[styles.bar, {backgroundColor: this.getStateColor(data.geo_state)}]}></View>
        <View style={styles.content}>
          <Text style={[styles.text, styles.geonum]}>地磁编号：{data.geo_num}</Text>
          <Text style={styles.text}>车位号：{data.parking_space_num}</Text>
        </View>
        <View style={styles.right}>
          <Text style={{color: this.getStateColor(data.geo_state)}}>{getStateDesc(data.geo_state)}</Text>
          <Image source={require('../assets/imgs/arrow.png')} style={styles.arrow} />
        </View>
      </TouchableOpacity>
    );
  }

  getStateColor(state) {
    let color = '#409EFF';

    switch (parseInt(state)) {
      case 1:
        break;
      case 2:
        color = '#909399';
        break;
      case 3:
        color = '#F56C6C';
        break;
      case 4:
      case 5:
      case 6:
        color = '#E6A23C';
        break;
      default:
        break;
    }

    return color;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 15,
    elevation: 4,
  },
  bar: {
    width: 4
  },
  content: {
    padding: 10,
    flex: 1
  },
  text: {
    lineHeight: 20
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  geonum: {
    fontSize: 16,
    color: '#000'
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 15,
  }
})