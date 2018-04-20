import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import { transformTime } from '../utils/tools';

const List = (props) => {
  return (
    <View>
      {
        props.data.map((item, index) => <List.Item data={item} key={index} />)
      }
    </View>
  )
}

List.Item = (props) => {
  const {
    park_state,
    operator,
    operate_time
  } = props.data;
  const {
    desc,
    color
  } = getStateDesc(park_state);
  
  return (
    <View style={styles.itemContainer} >
      <View style={[styles.itemLeft, {backgroundColor: color,}]} >
        <Text style={styles.itemLeftText} >{desc}</Text>
      </View>
      <View style={styles.itemRight} >
        <Text style={styles.itemRightTitle} >{operator}</Text>
        <Text>{transformTime(operate_time)}</Text>
      </View>
    </View>
  )
}

// 获取操作状态对应的描述
function getStateDesc(state) {
  let desc = '无车';
  let color = '#67C23A';

  switch (parseInt(state)) {
    case 0:
      break;
    case 1:
      desc = '有车';
      color = '#F56C6C';
      break;
    case 2:
      desc = '复位';
      color = '#E6A23C';
      break;
    default:
      break;
  }

  return {
    desc,
    color
  };
}

export default List;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLeft: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  itemLeftText: {
    color: '#fff',
    fontSize: 16,
  },
  itemRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemRightTitle: {
    fontSize: 16,
    color: '#000',
  }
})
