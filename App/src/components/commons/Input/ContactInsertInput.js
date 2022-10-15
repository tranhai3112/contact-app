import React from 'react'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import ContactInput from '../../container/Contact/ContactInput'
import { Text } from '@ui-kitten/components'
// pass onChangeText, placeholder, type, otherChoices 
const ContactInsertInput = ({
    onPress,
    item,
    text, 
    Icon, 
    onChangeText,
    placeholder, 
    otherChoices, 
    type, 
    data, 
    onRemove
    }) => {
    const onPressHandle = () => {
        onPress(item)
    }
    // console.log('rerender23');
  return (
    <>
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
    {data?.map((value, index) => (
        <ContactInput 
        key={index}
        data={{value, index}}
        onChangeText={onChangeText} 
        placeholder={placeholder} 
        type={type}
        otherChoices={otherChoices} 
        onRemove={onRemove}/>
    ))}
    </>
  )
}

export default React.memo(ContactInsertInput)

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
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    hiddenView:{
        flex:1
    },
    inputField:{
        flex:8
    }
})