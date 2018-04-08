import {StackNavigator} from 'react-navigation';  
import LoginScreen from './pages/Login';
import ParkMap from './pages/ParkMap';

export default StackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Index: {
      screen: ParkMap,
      navigationOptions: {
        title: '停车场'
      }
    }
  },
  {
    initialRouteName: 'Login'
  }
)
