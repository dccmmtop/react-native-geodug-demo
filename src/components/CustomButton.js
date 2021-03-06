import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';

/**
 * 自定义按钮
 * props说明：
 * 1.activeOpacity: 被触摸操作激活时以多少不透明度显示（通常在0到1之间）; 默认0.5
 * 2.text: button文本内容
 * 3.type: button类型: default/不传: 默认样式; plain: 朴素样式; round: 圆角样式;
 * 4.textStyle: 文本样式
 * 5.btnStyle: 自定义样式，可覆盖原有样式
 * 6.disabled: 是否禁用按钮点击事件
 */
export default class CustomButton extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    btnStyle: {},
    textStyle: {},
    text: '',
    activeOpacity: 0.9,
    type: 'default',
    underlayColor: '#FFCC66'
  }

  render() {
    const {
      activeOpacity,
      text,
      btnStyle,
      textStyle,
      type,
      underlayColor
    } = this.props;

    return (
      <TouchableHighlight
        activeOpacity={activeOpacity}
        underlayColor={underlayColor}
        style={[btnStyles.base, btnStyles[type], btnStyle]}
        {...this.props}
      >
        <Text style={[btnStyles.text, textStyle]}>{text}</Text>
      </TouchableHighlight>
    )
  }
};

const btnStyles = StyleSheet.create({
  base: {
    padding: 20,
    borderRadius: 4,
    backgroundColor: '#FF9900',
    // 注意：无此样式属性
    // border: none,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  default: {},
  plain: {
    padding: 19,
    borderWidth: 1,
    borderColor: '#dcdfe6',
    backgroundColor: '#fff'
  },
  round: {
    borderRadius: 40
  },
  text: {
    color: '#fff'
  },
  plainText: {
    color: '#606266'
  }
})
