import React, { Component } from 'react';
import { Text} from 'react-native';

const style = {
  flex: 1,
  textAlign: 'center', 
  marginRight: 55, 
  color: '#000'
}

/**
 * react-navigation 自带的顶部导航栏文字在Android上默认左对齐；
 * 用这个公共头部title组件替换，确保在Android上居中
 */
export default function(props) {
  return (
    <Text style={[style, props.style]}>{props.text}</Text>
  )
}