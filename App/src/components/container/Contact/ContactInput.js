import {View, StyleSheet, TextInput} from 'react-native'
import {Select, SelectItem} from '@ui-kitten/components'
import React from 'react'
import AndesignIcon from 'react-native-vector-icons/AntDesign'
import CustomInput from '../../commons/Input/CustomInput'
//TODO: add input type utils
const ContactField = ({data, onChangeText, placeholder, otherChoices, type, onRemove}) => {
    const [choiceIndex, setChoiceIndex] = React.useState(0)
    const placement = otherChoices[choiceIndex.row]
    const onSelect = (idx) => {
      setChoiceIndex(idx)
    }
    const onChangeTextHandle = (value) => {
        const {index} = data
        const label = placement === undefined ? 'Other' : placement
        if(type == 'phone') {
            const newData = {label, number:value}
            console.log(newData);
            onChangeText(newData,index)
        } else if (type == 'email') {
            const newData = {label, email:value}
            onChangeText(newData,index)
        } else if(type == 'im') {
            const newData = {label, username:value}
            onChangeText(newData, index)
        } else if(type == 'url') {
            const newData = {label, url:value}
            onChangeText(newData, index)
        } else if(type == 'relationship') {
            const newData = {label, relationship:value}
            onChangeText(newData, index)
        } else if(type == 'note') {
            onChangeText(value, index)
        }
    }
    return (
        <View style={[styles.container, ]}>
            <View style={styles.hiddenView}>
            </View>
            <View style={styles.inputField}>
                <CustomInput placeholder={placeholder} keyboardType={type === 'phone' ? 'phone-pad':'default'} value={data?.value} onChangeText={onChangeTextHandle} autoFocus/>
            </View>
            {['note'].includes(type) ? null : (
                //https://github.com/akveo/react-native-ui-kitten/issues/1538 style select
            <View style={{paddingHorizontal:12, flex:5}}>
                <Select placeholder='Other' onSelect={onSelect} value={placement} status="custom">
                {otherChoices?.map((item,index) => (
                    <SelectItem title={item} key={index}/>
                ))}
                </Select>
            </View>
            )}
            <View style={{alignSelf:'center'}}>
                <AndesignIcon name="close" color='red' size={20} onPress={() => onRemove(data?.index)}/>
            </View>
        </View>
    )
}

export default React.memo(ContactField)

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    hiddenView:{
        width:30
    },
    inputField:{
        flex:8
    }
})