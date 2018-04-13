import React, { Component } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => this.handleLeft()} activeOpacity={0.8}>
          {
            this.props.left || 
            <Image 
              source={require('../assets/imgs/personal.png')} 
              style={styles.headerLeft} 
            />
          }
        </TouchableOpacity>
        <Text style={styles.headerTitle}>停车场</Text>
        <View style={styles.headerRight}>
          {this.props.right}
        </View>
      </View>
    );
  }

  handleLeft() {
    this.props.onLeft();
  }
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    position: 'relative',
    zIndex: 10
  },
  headerLeft: {
    width: 20, 
    height: 20, 
    marginLeft: 20
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
    fontSize: 16
  },
  headerRight: {
    width: 40
  }
})