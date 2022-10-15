import {View, StyleSheet } from 'react-native'
import {Select, SelectItem} from '@ui-kitten/components'
import React from 'react'
import AndesignIcon from 'react-native-vector-icons/AntDesign'
import CustomInput from '../../commons/Input/CustomInput'
const otherChoices = ['sd','asd','asdsd']

const ContactAddressInput = ({onChangeText, onRemove, data}) => {
    const [choiceIndex, setChoiceIndex] = React.useState(0)
    const [address, setAddress] = React.useState({
        street:'',
        city: '',
        state: '',
        postCode: '',
        country:'',
    })
    React.useEffect(() => {
        onChangeText(address, data.index)
    },[address])
    const placement = otherChoices[choiceIndex.row]
    const onSelect = (idx) => {
      setChoiceIndex(idx)
    }
    const {value} = data
    const onChangeStreet = (value) => {
        setAddress((prevState) => ({...prevState, street:value}))
    }
    const onChangeCity = (value) => {
        setAddress((prevState) => ({...prevState, city:value}))
    }
    const onChangeState = (value) => {
        setAddress((prevState) => ({...prevState, state:value}))
    }
    const onChangePostcode = (value) => {
        setAddress((prevState) => ({...prevState, postCode:value}))
    }
    const onChangeCountry = (value) => {
        setAddress((prevState) => ({...prevState, country:value}))
    }
    console.log(data);
  return (
    <View style={styles.container}>
        <View style={styles.hiddenView}>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputField}>
                <CustomInput placeholder='Street' value={value?.street} onChangeText={onChangeStreet}/>
                <CustomInput placeholder='City' value={value?.city} onChangeText={onChangeCity}/>
                <View style={styles.inputFieldVertical}>
                    <View style={{flex:1, marginRight:12}}>
                        <CustomInput placeholder='State' value={value?.state} onChangeText={onChangeState}/>
                    </View>
                    <View style={{flex:2}}>
                        <CustomInput placeholder='Postal code' value={value?.postCode} onChangeText={onChangePostcode}/>
                    </View>
                </View>
                <View style={styles.inputFieldVertical}>
                    <View style={{flex:3}}>
                        <CustomInput placeholder='Country' value={value?.country} onChangeText={onChangeCountry}/>
                    </View>
                    <View style={{flex:1}}>
                    </View>
                    <Select placeholder='Other' onSelect={onSelect} value={placement} status='custom'>
                        {otherChoices?.map((item,index) => (
                        <SelectItem title={item} key={index}/>
                        ))}
                    </Select>
                </View>
            </View>
            <View style={styles.iconField}>
                <AndesignIcon name="close" color='red' size={20} onPress={() => onRemove(data?.index)}/>
            </View>
        </View>
    </View>
  )
}

export default ContactAddressInput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    hiddenView: {
        flex:1
    },
    inputContainer: {
        flex:12,
        flexDirection: 'row',
    },
    inputField: {
        flex:9
    },
    inputFieldVertical: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'flex-end'
    },
    iconField:{
        flex:1,
        marginTop:16
    },
})