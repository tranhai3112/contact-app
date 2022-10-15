import React from 'react'
import AddContact from '../../../screens/Contact/AddContact'
import ListContact from '../../../screens/Contact/ListContact'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AndesignIcon from 'react-native-vector-icons/AntDesign'
import Logined from '../../../screens/Backup/Logined'

const Stack = createNativeStackNavigator()

//list contact
//add contact
//edit contact
const ContactStack = () => {
  return (
    <Stack.Navigator id='stackNavigator' screenOptions={{
      headerShown:false,
      contentStyle:{
        backgroundColor:"#fff",
      },
      animation:'slide_from_left'
    }}>
      <Stack.Screen name='ListContact' component={ListContact} />
      <Stack.Screen name='AddContact' component={AddContact} options={{
        headerShown: true,
        headerRight: (props) => (
          <AndesignIcon name="check" color='#329da8' size={24} />
        )
      }} />
      <Stack.Screen name='Logined' component={Logined} options={{
        headerShown:true,
        headerShadowVisible:false,
      }} initialParams={{
        title: 'Add Contact' 
      }}/>
    </Stack.Navigator>
  )
}

export default ContactStack