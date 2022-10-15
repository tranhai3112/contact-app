import React from 'react'
import {TextInput} from 'react-native'
import colors from '../../../constants/colors'

const CustomInput = ({placeholder, value, onChangeText, autoFocus, keyboardType}) => {
    const [highlight, setHighlight] = React.useState(false)
    const onFocus = () => {
        setHighlight(true)
    }
    const onBlur = () => {
        setHighlight(false)
    }
  return (
        <TextInput 
         style={[{borderBottomWidth: 0.4}, highlight ? {borderBottomColor:colors.primaryColor} : {borderBottomColor:'#ccc'}]}
         placeholder={placeholder} 
         value={value} 
         onChangeText={onChangeText}
         keyboardType={keyboardType}
         autoFocus={autoFocus}
         onFocus={onFocus} 
         onBlur={onBlur}/>
  )
}

export default CustomInput

