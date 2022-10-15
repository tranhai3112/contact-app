import React from 'react'
import {View, StyleSheet, Pressable} from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native'
import Avatar from '../../components/commons/Avatar'
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

const DrawerDefaultHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={{width:'100%', height:50, backgroundColor:'#fff'}}>
    <View style={styles.container}>
        <View style={styles.drawerContent}>
          <FontAwesomeIcon name='bars' size={20} color='#000' onPress={() => navigation.openDrawer()}/>
        </View>
        <View style={styles.searchContainer}>
          <View style={{flex:1}}>
            <TextInput placeholder='Search for people' onChangeText={() => {}} onFocus={() => console.log('focus')}/>
          </View>
          <Pressable style={{width:50, alignSelf:'center'}} onPress={() => {}}>
            <Avatar size={26}/>
          </Pressable>
        </View>
    </View>
    </View>

  )
}

export default DrawerDefaultHeader

const styles = StyleSheet.create({
  container:{
    flex:1,
    position:'absolute',
    left:16,
    right:16,
    top:6,
    height:40,
    borderRadius:18,
    backgroundColor:'#fff',
    elevation:14,
    shadowColor:'#000',
    shadowOpacity:0.4,
    shadowRadius:8,
    shadowOffset:{
      width:0,
      height:14
    },
    overflow:'hidden',
    paddingHorizontal:14,
    alignItems:'center',
    flexDirection:'row'
  },
  drawerContent: {
    width:30
  },
  searchContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
})