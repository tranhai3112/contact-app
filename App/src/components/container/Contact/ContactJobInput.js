import {View, StyleSheet } from 'react-native'
import React from 'react'
import AndesignIcon from 'react-native-vector-icons/AntDesign'
import CustomInput from '../../commons/Input/CustomInput'
const ContactJobInput = ({data, onRemove, onChangeText}) => {
    const [job, setJob] = React.useState({
        jobTitle:'',
        company:'',
        department:''
    })
    React.useEffect(() => {
        onChangeText(job, data.index)
    }, [job])
    const {value} = data
    const onChangeJobTitle = (value) => {
        setJob((prevState) => ({...prevState, jobTitle:value}))
    }
    const onChangeCompany = (value) => {
        setJob((prevState) => ({...prevState, company:value}))
    }
    const onChangeDepartment = (value) => {
        setJob((prevState) => ({...prevState, department:value}))
    }
  return (
    <View style={styles.container}>
        <View style={styles.hiddenView}>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputField}>
                <CustomInput placeholder='Job title' value={value?.jobTitle} onChangeText={onChangeJobTitle}/>
                <CustomInput placeholder='Department' value={value?.company} onChangeText={onChangeCompany}/>
                <CustomInput placeholder='Organization' value={value?.department} onChangeText={onChangeDepartment}/>
            </View>
            <View style={styles.iconField}>
                <AndesignIcon name="close" color='red' size={20} onPress={() => onRemove(data?.index)}/>
            </View>
        </View>
    </View>
  )
}

export default ContactJobInput

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
    iconField:{
        flex:1,
        marginTop:16
    },
})