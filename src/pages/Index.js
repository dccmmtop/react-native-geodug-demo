import { DrawerNavigator } from 'react-navigation';
import PersonalSideNav from './PersonalSideNav';
import ParkMap from './ParkMap';

export default DrawerNavigator({
  Home: {
    screen: ParkMap,
    navigationOptions: {
      header: null
    }
  }
}, {
  drawerWidth: 200,
  drawerBackgroundColor : '#FF9900',
  contentComponent: PersonalSideNav
})
