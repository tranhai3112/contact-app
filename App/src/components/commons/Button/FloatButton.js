import React from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import AndesignIcon from 'react-native-vector-icons/AntDesign'

const FloatButton = ({containerStyle, size, icon , color, onPress}) => {
  return (
        <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle, {width:size, height:size, borderRadius:size/2}]}>
            <View >
                <AndesignIcon name={icon} size={size} color={color}/>
            </View>
        </TouchableOpacity>
  )
}   

export default FloatButton

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        bottom:20,
        right:20,
        elevation:4,
        shadowColor:'#000',
        shadowOpacity:0.15,
        shadowRadius:4,
        shadowOffset:{
            width:4,
            height:6
        },
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        zIndex:999,
    },
   
})