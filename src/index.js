import {StackNavigator} from 'react-navigation';  
import LoginScreen from './pages/Login';
import ParkMap from './pages/ParkMap';
import GeoList from './pages/GeoList';
import ParkSearch from './pages/ParkSearch';

export default StackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Index: {
      screen: ParkMap,
      navigationOptions: {
        header: null
      }
    },
    GeoList: {
      screen: GeoList
    },
    ParkSearch: {
      screen: ParkSearch,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Login'
  }
)
