import React from 'react'
import {View, StyleSheet, TouchableHighlight, TextInput} from 'react-native'
import { Text } from '@ui-kitten/components'
const ContactLabel = ({onPress, text, Icon, item}) => {
    const onPressHandle = () => {
        onPress(item)
    }
  return (
    <TouchableHighlight onPress={onPressHandle} underlayColor="#ccc" style={[styles.inputContainer, {paddingVertical:4}]}>
    <>
        <View style={styles.icon}>
          <Icon/>
        </View>
        <View>
            <Text category='s1'>{text}</Text>
        </View>
        
    </>
  </TouchableHighlight>
  )
}

export default React.memo(ContactLabel) // props: text


const styles = StyleSheet.create({
    inputContainer:{
      flexDirection:'row',
      flex:1,
      alignItems:'center'
    },
    icon:{
      paddingVertical:6,
      paddingRight:14
    },
  })