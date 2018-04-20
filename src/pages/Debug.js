import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Loading from '../components/Loading';
import HeaderTitle from '../components/CommonHeaderTitle';
import http from '../utils/ajax';
import { getStateDesc, transformTime } from '../utils/tools';
import Button from '../components/CustomButton';

const ParkState = (props) => {
  return (
    <View style={[{backgroundColor: props.state == 0 ? '#67C23A' : '#F56C6C'}, styles.badge, props.style]}>
      <Text style={{color: '#fff'}} >{props.state == 0 ? '无车' : '有车'}</Text>
    </View>
  )
}

const Line = (props) => {
  return (
    <View style={styles.line} >
      <Text>{props.label}</Text>
      {
        typeof props.children === 'string' 
          ? <Text>{props.children}</Text>
          : props.children
      }
    </View>
  )
}

export default class GeoList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const geoData = navigation.state.params.geoData;
    return {
      headerTitle: <HeaderTitle text="地磁调试" style={{marginRight: 0,}} />,
      headerRight: (
        <TouchableOpacity onPress={() => {navigation.navigate('OperateRecord', {geo_num: geoData.geo_num})}} >
          <Text style={{color: '#409EFF', marginRight: 15,}}>操作记录</Text>
        </TouchableOpacity>
      )
    }
  }

  state = {
    showLoading: false,
    geoData: {}
  }

  componentWillMount() {
    this.setState({
      geoData: this.props.navigation.state.params.geoData
    })
  }

  render() {
    const {
      parking_space_num,
      geo_num,
      left_geo,
      right_geo,
      last_debug_time,
      last_reset_time,
      detect_state,
      geo_state
    } = this.state.geoData;
    return (
      <ScrollView>
        <View style={styles.detailContainer}>
          <Text style={styles.title} >{parking_space_num}</Text>
          <Line label="地磁编号：" >{geo_num}</Line>
          <Line label="地磁状态：" >{getStateDesc(geo_state)}</Line>
          <Line label="检测状态：" >
            <ParkState state={detect_state} />
          </Line>
          <Line label="最近一次复位时间：" >{transformTime(last_reset_time)}</Line>
          <Line label="最近一次调试时间：" >{transformTime(last_debug_time)}</Line>
          <Line label="左侧车位：" ></Line>
          <View style={styles.space}>
            <Text style={{flex: 1, textAlign: 'center'}}>{left_geo.geo_num}</Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
              <ParkState state={left_geo.park_state} style={{width: 50}} />
            </View>
          </View>
          <Line label="右侧车位：" ></Line>
          <View style={styles.space}>
            <Text style={{flex: 1, textAlign: 'center'}}>{right_geo.geo_num}</Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
              <ParkState state={right_geo.park_state} style={{width: 50}} />
            </View>
          </View>
        </View>
        <View style={styles.btnContainer} >
          <Button 
            text="无车" 
            underlayColor="#67C23A" 
            type="round"
            activeOpacity={0.7}
            btnStyle={[styles.btnStyle, {backgroundColor: '#67C23A',}]} 
            textStyle={{fontSize: 18,}}
            onPress={() => this.onOpreate(0)}
          />
          <Button 
            text="有车" 
            underlayColor="#F56C6C" 
            type="round" 
            activeOpacity={0.7}
            btnStyle={[styles.btnStyle, {backgroundColor: '#F56C6C',}]} 
            textStyle={{fontSize: 18,}}
            onPress={() => this.onOpreate(1)}
          />
          <Button 
            text="复位" 
            underlayColor="#E6A23C" 
            type="round" 
            activeOpacity={0.7}
            btnStyle={[styles.btnStyle, {backgroundColor: '#E6A23C',}]} 
            textStyle={{fontSize: 18,}}
            onPress={() => this.onOpreate(2)}
          />
        </View>
        {
          this.state.showLoading ? <Loading /> : null
        }
      </ScrollView>
    );
  }

  onOpreate(state) {
    switch (state) {
      case 0:
      case 1:
        Alert.alert(
          '提示', 
          `是否将该车位标记为${state == 0 ? '无车' : '有车'}？`, 
          [
            {text: '取消', onPress: () => {}, style: 'cancel'},
            {text: '确定', onPress: () => this.markParkState(state)},
          ]
        );
        break;
      case 2:
        Alert.alert(
          '提示', 
          `是否对该车位地磁进行复位操作？`, 
          [
            {text: '取消', onPress: () => {}, style: 'cancel'},
            {text: '确定', onPress: () => this.reset()},
          ]
        );
        break;
      default:
        break;
    }
  }

  successCallback() {
    Alert.alert(
      '提示', 
      '操作成功', 
      [
        {text: '返回', onPress: () => {this.props.navigation.goBack(null)}},
        {text: '下一个车位', onPress: () => {this.nextSpace()}},
      ],
      { cancelable: false }
    )
  }

  markParkState(state) {
    this.setState({
      showLoading: true
    });

    // 请求
    setTimeout(() => {
      this.setState({
        showLoading: false
      }, () => {
        this.successCallback();
      });
    }, 2000);
  }

  reset() {
    this.setState({
      showLoading: true
    });

    // 请求
    setTimeout(() => {
      this.setState({
        showLoading: false
      }, () => {
        this.successCallback();
      });
    }, 2000);
  }

  // 跳转请求下一个车位数据
  nextSpace() {
    this.setState({
      showLoading: true
    });

    setTimeout(() => {
      this.props.navigation.setParams({
        geoData: {
          geo_num: this.props.navigation.state.params.geoData.right_geo.geo_num
        }
      })
    }, 1000);
    // 请求数据更新geoData
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 20,
    color: '#409EFF',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  line: {
    height: 30,
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  space: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  badge: {
    height: 20, 
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainer: {
    paddingTop: 0, 
    paddingBottom: 20, 
    paddingHorizontal: 70,
  },
  btnStyle: {
    marginTop: 30, 
    elevation: 3
  }
})
