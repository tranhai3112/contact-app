import React, {createContext} from 'react'
// import Contact from '../../screens/Contact/Contact'
import { createDrawerNavigator } from '@react-navigation/drawer'
import BottomTabNavigation from '../BottomTab/BottomTabNavigation'
import DrawerHeader from './DrawerDefaultHeader'
// import ContactItemSelected from '../../components/container/Header/ContactItemSelected'
const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator id='drawerNavigator' screenOptions={{
      header:DrawerHeader,
      
    }}>
        <Drawer.Screen name='MainScreen' component={BottomTabNavigation}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigation