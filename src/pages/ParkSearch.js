import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import SearchList from '../components/SearchList';
import http from '../utils/ajax';

export default class PrakSearch extends Component {
  state = {
    parkData: [
      {
        "lng": 116.37296,
        "lat": 39.91095,
        "id": 1,
        "car_park_name": "测试停车场1",
        "parking_space_num": 20,
        "geom_num": 20,
        "address": "杭州市西湖区西溪银座"
      },
      {
        "lng": 116.37296,
        "lat": 39.81095,
        "id": 2,
        "car_park_name": "测试停车场2",
        "parking_space_num": 20,
        "geom_num": 20,
        "address": "杭州市西湖区西溪银座"
      }
    ]
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill} >
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} activeOpacity={0.9} >
            <Image source={require('../assets/imgs/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.container}>
            <Image source={require('../assets/imgs/search.png')} style={styles.searchIcon} />
            <TextInput
              placeholder="搜索"
              style={styles.input}
              autoFocus={true}
              underlineColorAndroid="transparent"
              onChangeText={(value) => this.search(value)}
            />
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff',}}>
          <FlatList
            data={this.state.parkData}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <SearchList data={item} onPress={() => this.onSelectPark(item)} /> }
          />
        </View>
      </View>
    );
  }

  // 该函数要求必须返回String类型
  _keyExtractor = (item, index) => item.id.toString();

  search() {
    // http.post('', )
  }

  async onSelectPark(data) {
    await AsyncStorage.setItem('selectPark', JSON.stringify(data));
    this.props.navigation.goBack(null);
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 48,
    paddingVertical: 5,
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  backIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 15,
  },
  searchIcon: {
    width: 30,
    height: 30
  },
  input: {
    padding: 0,
    flex: 1,
    fontSize: 16,
  }
})