import {StackNavigator} from 'react-navigation';  
import LoginScreen from './pages/Login';

export default StackNavigator(
  {
    Login: {
      screen: LoginScreen
    }
  }
)