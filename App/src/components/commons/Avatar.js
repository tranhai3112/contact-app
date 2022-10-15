import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import AndesignIcon from 'react-native-vector-icons/AntDesign'
import colors from '../../constants/colors'

const Avatar = ({onPress, size, style, isSelected}) => {
  return (
    <Pressable onPress={onPress} >
        {isSelected ? (
            <View
              style={{
                width:size,
                height:size, 
                borderRadius:size/2, 
                backgroundColor:colors.primaryColor,
                justifyContent:'center',
                alignItems:'center'
              }}
            >
              <AndesignIcon name="check" size={20} color='#fff' />
            </View>
        ) : (
            <Image 
            resizeMode='cover'
            source={require('../../assets/miyata.jpg')}
            style={[{width:size, height:size, borderRadius:size/2}]}
            />
        )}
    </Pressable>
  )
}

export default Avatar

const styles = StyleSheet.create({
})