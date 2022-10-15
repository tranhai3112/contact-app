import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FeatherIcon from 'react-native-vector-icons/Feather'

import Call from '../../screens/Call/Call'
// import Contact from '../../screens/Contact/AddContact'

// import Message from '../../screens/Backup/Backup'
// import Contact from '../../screens/Contact/Contact'
import Tools from '../../screens/Tools'

import ContactStack from '../Stack/Contact/ContactStack'


import { StyleSheet, Dimensions } from 'react-native'
import Backup from '../../screens/Backup/Backup'
import BackupStack from '../Stack/Backup/BackupStack'


const BottomTab = createBottomTabNavigator()

const screenWidth = Dimensions.get('screen').width

const BottomTabNavigation = () => {
  return (
    <> 
    <BottomTab.Navigator id='bottomTabNavigator' screenOptions={{
      headerShown: false,
      tabBarIconStyle: styles.tabBarStyle,

      tabBarIconStyle: {
        fontSize: screenWidth * 0.1,
        color: 'black',
      },
      tabBarLabelStyle: {
        fontSize: 8,
      },
      tabBarStyle: {
        maxHeight: 60
      },
      tabBarHideOnKeyboard: true,
    }}>
      <BottomTab.Screen name='Contact' component={ContactStack} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <AntDesignIcon name="contacts" size={focused ? size : 24} color={focused ? '#329da8' : color} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <View style={{ marginTop: 0, padding: 0 }}>
            <Text style={{ display: focused ? 'flex' : 'none' }}>Contact</Text>
          </View>
        )
      }} />
      <BottomTab.Screen name='Call' component={Call} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="call-outline" size={focused ? size : 24} color={focused ? '#329da8' : color} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <View style={{ marginTop: 0, padding: 0 }}>
            <Text style={{ display: focused ? 'flex' : 'none' }}>Call</Text>
          </View>
        )
      }} />
      <BottomTab.Screen name='Backup' component={BackupStack} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Fontisto name="cloud-up" size={focused ? size : 24} color={focused ? '#329da8' : color} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <View style={{ marginTop: 0, padding: 0 }}>
            <Text style={{ display: focused ? 'flex' : 'none' }}>Message</Text>
          </View>
        )
      }} />
      <BottomTab.Screen name='Tools' component={Tools} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <FeatherIcon name="tool" size={focused ? size : 24} color={focused ? '#329da8' : color} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <View style={{ marginTop: 0, padding: 0 }}>
            <Text style={{ display: focused ? 'flex' : 'none' }}>Tools</Text>
          </View>
        )
      }} />

    </BottomTab.Navigator>
    </>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({
  tabBarStyle: {

  },

})