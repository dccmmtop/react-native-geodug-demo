import {StackNavigator} from 'react-navigation';  
import LoginScreen from './pages/Login';
import Index from './pages/Index';
import GeoList from './pages/GeoList';
import ParkSearch from './pages/ParkSearch';
import Debug from './pages/Debug';
import OperateRecord from './pages/OperateRecord';

export default StackNavigator(
  {
    // 登录页
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    // 停车场地图首页
    Index: {
      screen: Index,
      navigationOptions: {
        header: null
      }
    },
    // 地磁列表页
    GeoList: {
      screen: GeoList
    },
    // 搜索停车场列表页
    ParkSearch: {
      screen: ParkSearch,
      navigationOptions: {
        header: null
      }
    },
    // 地磁调试页
    Debug: {
      screen: Debug
    },
    // 操作记录页
    OperateRecord: {
      screen: OperateRecord
    }
  },
  {
    initialRouteName: 'Login'
  }
)
