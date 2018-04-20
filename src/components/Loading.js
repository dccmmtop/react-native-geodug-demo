import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  static defaultProps = {
    text: '加载中...'
  }

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  }

  render() {
    // 使用TouchableOpacity的原因：使用View点击事件会在下层元素触发，因为View没有点击事件，所以需要TouchableOpacity避免点击穿透
    return (
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={($event) => {}}>
        <View style={styles.frame} >
          <ActivityIndicator color="#fff" size="large" />
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    padding: 20,
    backgroundColor: '#000',
    opacity: .7,
    borderRadius: 5
  },
  text: {
    color: '#fff',
    marginTop: 10
  }
})