import { TabNavigator } from 'react-navigation';
import Colors from '../../constants/Colors';
import { HomeScreen, NotificationsScreen, ProfileScreen } from '../screens';

export default TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  NotificationsScreen: {
    screen: NotificationsScreen,
  },
  ProfileScreen: {
    screen: ProfileScreen,
  },
},
{
  swipeEnabled: false,
  animationEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    inactiveTintColor: Colors.blackBlueColor,
    activeTintColor: Colors.redColor,
    pressColor: Colors.redColor,
    indicatorStyle: {
      backgroundColor: Colors.redColor,
    },
    style: {
      backgroundColor: Colors.whiteColor,
    },
  },
});
