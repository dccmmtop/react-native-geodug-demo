import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ActionSheet from 'react-native-actionsheet';
import GeoListItem from '../components/GeoListItem';
import http from '../utils/ajax';

// 地磁状态类别
const geoTypes = [
  {
    id: 0,
    desc: '全部地磁'
  },
  {
    id: 1,
    desc: '在线'
  },
  {
    id: 2,
    desc: '离线'
  },
  {
    id: 3,
    desc: '报错'
  },
  {
    id: 4,
    desc: 'X轴损坏'
  },
  {
    id: 5,
    desc: 'Y轴损坏'
  },
  {
    id: 6,
    desc: 'Z轴损坏'
  }
];

export default class GeoList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const parkData = navigation.state.params.park;
    return {
      headerTitle: <Text style={styles.headerTitle}>{parkData.car_park_name}</Text>
    }
  }

  state = {
    type: geoTypes[0],
    geoData: [

    ]
  }

  componentDidMount() {
    this.getGeoData();
  }

  render() {
    return (
      <View style={[StyleSheet.absoluteFill, {backgroundColor: '#F4F4F4',}]}>
        <TouchableOpacity 
          style={styles.select}
          activeOpacity={0.9}
          onPress={() => this.selectType()} >
          <Text style={styles.typeText}>{this.state.type.desc}</Text>
          <Image source={require('../assets/imgs/more.png')} style={styles.typeIcon} />
        </TouchableOpacity>
        <FlatList
          data={this.state.geoData}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => <GeoListItem data={item} onPress={() => this.gotoDebug(item)} /> }
        />
        <ActionSheet 
          ref={o => this.ActionSheet = o}
          title={'请选择您要查看的地磁类别'}
          options={geoTypes.map(item => item.desc).concat(['取消'])}
          cancelButtonIndex={geoTypes.length}
          destructiveButtonIndex={3}
          onPress={(index) => this.onSelect(index)}
        />
      </View>
    );
  }

  _keyExtractor = (item, index) => item.geo_num.toString();

  getGeoData() {
    http.get('http://192.168.10.187:8081/mock/geo.json').then(res => {
      this.setState({
        geoData: res
      });
    });
  }

  gotoDebug(data) {
    this.props.navigation.goBack(null);
  }

  selectType() {
    this.ActionSheet.show();
  }

  onSelect(index) {
    if (index === geoTypes.length) return;

    this.setState({
      type: geoTypes[index]
    }, () => {
      // 刷新地磁列表
    });
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    textAlign: 'center', 
    marginRight: 55, 
    color: '#000'
  },
  select: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 60,
    padding: 5,
    borderColor: '#409EFF',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  typeText: {
    color: '#409EFF',
    fontSize: 16,
  },
  typeIcon:{
    position: 'absolute',
    right: 20,
    width: 20,
    height: 20
  }
})
