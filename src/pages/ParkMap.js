import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, AsyncStorage, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MapView, Marker } from 'react-native-amap3d';
import Header from '../components/Header';
import http from '../utils/ajax';
import MapInfoWindow from '../components/MapInfoWindow';
import ESC from '../mixins/ESC';

class ParkMap extends Component {
  state = {
    first: true, // 标志是否第一次定位
    coordinate: {
      latitude: 39.91095,
      longitude: 116.37296
    },
    parkData: [],
    selectPark: {},
    canSearchClick: true
  }

  componentDidMount() {
    this.getParkData();

    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        BackHandler.addEventListener('hardwareBackPress', this.props.backHandler);
        this.getStorage().then(data => {
          if (data) {
            data = JSON.parse(data);
            AsyncStorage.removeItem('selectPark');
            this.locate(data, this.showInfoWindow.bind(this, data));
          }
        })
      }
    );

    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        BackHandler.removeEventListener('hardwareBackPress', this.props.backHandler);
      }
    );
  }

  componentWillUnmount() {
    if (this.didFocusSubscription) {
      this.didFocusSubscription.remove();
    }

    if (this.willBlurSubscription) {
      this.willBlurSubscription.remove();
    }
  }

  render() {
    const markers = this.state.parkData.map(item => 
      <Marker 
        coordinate={{
          latitude: item.lat,
          longitude: item.lng
        }}
        key={item.id}
        icon={() => (
          <Image source={require('../assets/imgs/mark.png')} style={styles.marker} />
        )}
        infoWindowDisabled
        onPress={() => this.showInfoWindow(item)}
      />
    );

    return (
      <View style={StyleSheet.absoluteFill} >
        <Header onLeft={() => this.showDrawer()} />
        <MapView
          ref={ref => this.mapView = ref}
          locationEnabled
          showsZoomControls={false}
          coordinate={{
            latitude: 39.91095,
            longitude: 116.37296
          }}
          rotateEnabled={false}
          onLocation={({ nativeEvent }) => this.locate(nativeEvent)}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => this.hideInfoWindow()}
        >
          {markers}
        </MapView>
        <TouchableOpacity 
          style={styles.search} 
          onPress={() => this.onSearch()} 
          activeOpacity={0.9} 
          disabled={!this.state.canSearchClick} 
        >
          <Image source={require('../assets/imgs/search.png')} style={styles.searchIcon} />
          <Text style={styles.searchText}>查找停车场</Text>
        </TouchableOpacity>
        <MapInfoWindow 
          ref={ref => this.infoWindow = ref} 
          data={this.state.selectPark} 
          onLocate={() => this.locate('locate')}
          onSkip={() => this.navigateToGeoList()}
        />
      </View>
    )
  }

  async getStorage() {
    let data = null;
    try {
      data = await AsyncStorage.getItem('selectPark');
    } catch (error) {
      console.error(error);
      data = null;
    }

    return data;
  }

  getParkData() {
    http.get('http://192.168.10.187:8081/mock/park.json').then(res => {
      this.setState({
        parkData: res
      });
    });
  }

  showDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }

  /**
   * 定位
   * @param {Event | String} event 
   *    Event: 地图触发onlocation时返回的map对象
   *    String: 值只能为 'locate' ，是定位图标触发定位事件
   * @param {Function} func 
   *    地图移动到指定中心点后的回调，用于搜索停车场后定位事件
   */
  locate(event, func) {
    let coordinate = this.state.coordinate;
    const isSearchLocate = typeof func === 'function';

    if (this.state.first || event === 'locate' || isSearchLocate) {
      this.setState({
        first: false
      });

      this.mapView.animateTo({
        tilt: 0,
        rotation: 0,
        zoomLevel: 12,
        coordinate: this.state.first || isSearchLocate ? {
            latitude: event[isSearchLocate ? 'lat' : 'latitude'],
            longitude: event[isSearchLocate ? 'lng' : 'longitude']
          } : coordinate
      });

      isSearchLocate && func();
    }

    !isSearchLocate && this.setState({
      coordinate: {
        latitude: event.latitude,
        longitude: event.longitude,
      }
    });
  }

  showInfoWindow(data) {
    this.setState({
      selectPark: data
    }, () => {
      this.infoWindow.showInfoWindow();
    })
  }

  hideInfoWindow() {
    this.infoWindow.hideInfoWindow();
  }

  navigateToGeoList() {
    const { state, navigate } = this.props.navigation; 
    navigate('GeoList', {park: this.state.selectPark});
  }

  onSearch() {
    this.setState({
      canSearchClick: false
    });

    setTimeout(() => {
      this.setState({
        canSearchClick: true
      });
    }, 1500);

    const { state, navigate } = this.props.navigation; 
    navigate('ParkSearch');
  }
}

const styles = StyleSheet.create({
  marker: {
    width: 30, 
    height: 30
  },
  search: {
    width: Dimensions.get('window').width - 40,
    position: 'absolute',
    top: 58,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    opacity: .9
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  searchText: {
    fontSize: 14
  }
})

export default ESC(ParkMap, true);