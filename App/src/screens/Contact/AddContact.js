import React from 'react'
import {View, StyleSheet, TextInput } from 'react-native'
import { useFocusEffect, useNavigation,useRoute } from '@react-navigation/native'
import colors from '../../constants/colors'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler'
import ContactLabel from '../../components/container/Contact/ContactLabel'
import ContactInput from '../../components/container/Contact/ContactInput'
// import ContactInsertInput from '../../components/commons/Input/ContactInsertInput'
import CustomCalendar from '../../components/commons/Modal/Calendar'
import ContactAddressInput from '../../components/container/Contact/ContactAddressInput'
import ContactJobInput from '../../components/container/Contact/ContactJobInput'
import AndesignIcon from 'react-native-vector-icons/AntDesign'

import { useRQGlobalState, key } from '../../../client'
import ContactProvider, {ContactContext} from '../../context/ContactContextForm'

import { useInsertContact, useUpdateContact } from '../../Api/Contact/ContactHooks'

const otherChoices = ['other','work','home','company']

const phoneNewFields = {label:'', number:''}
const emailNewFields = {label:'', email:''}
const profileNewFields = {lable:'', profile:''}
const imNewFields = {service:'', username:''}
const postalAddressesNewFields = {
  street:'',
  city: '',
  state: '',
  postCode: '',
  country:'',
}
const jobNewFields = {jobTitle:'', company:'', department: ''}
const urlsNewFields = {label:'', url:''}
const relationshipNewFields = {label:'', relationship:''}

//type: add, modify
const AddContact = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const mode = route.params?.mode || 'add'
  const insertData = useInsertContact()
  const updateData = useUpdateContact()
  const {contactFormData,
    birthday,
    birthdayModalVisible,
    setBirthdayModalVisible,
    title,
    firstName,
    middleName,
    lastName,
    suffix, 
    nickName,
    onChangeTitle,
    onChangeFirstName,
    onChangeMiddleName,
    onChangeLastName,
    onChangeSuffix,
    onChangeNickName,
    onPressPhone,
    onPressEmail,
    onPressProfile,
    onPressImAddress,
    onPressPostalAddress,
    onPressJob,
    onPressUrl,
    onPressRelationship,
    onPressNote,
    test,
    onChangePhone,
    onChangeEmail,
    onChangeImAddress,
    onChangeBirthDay,
    onChangePostalAddress,
    onChangeJob,
    onChangeUrl,
    onChangeRelationship,
    onChangeNote,
    removePhoneNumbers,
    removeEmailAddress,
    removeImAddresses,
    removePostalAddress,
    removeJob,
    removeUrls,
    removeRelationship,
    removeNote,
    setContactFormData
    } = React.useContext(ContactContext)

  const [contact] = useRQGlobalState(key.Contact, {}) 
  const [, setContactsSeleted] = useRQGlobalState(key.ContactsSeleted, [])
  
  useFocusEffect(React.useCallback(() => {
    setContactsSeleted([])
  }, []))

  // navigation options
  React.useLayoutEffect(() => {
    const headerTitle = route.params?.EditTitle || 'Add Contact'
    navigation.getParent('drawerNavigator').setOptions({
      headerShown:false
    })
    navigation.getParent('bottomTabNavigator').setOptions({
      tabBarStyle:{
        display:'none'
      }
    })  
    navigation.setOptions({
      headerRight:() => (
        <AndesignIcon name="check" color='#329da8' size={24} onPress={onSave}/>
      ),
      title: headerTitle
    })

    return () => {
      navigation.getParent('drawerNavigator').setOptions({
        headerShown:true
      })
      navigation.getParent('bottomTabNavigator').setOptions({
        tabBarStyle:{
          display:'flex'
        }
      })
    }
  },[navigation, contactFormData])

  React.useEffect(() => {
    mode === 'edit' ? setContactFormData(contact) : setContactFormData({
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      nickName: '',
      phoneNumbers: [],
      emailAddresses: [],
      profile: '', //social profile,
      imAddresses: [],
      postalAddresses:[],
      job:[],
      birthday: {year:null, month:null, day:null, dateString:null},
      urls:[],
      relationship:[],
      tags:[],
      notes:[]
    })
  }, [mode])


  const onSave = async () => {
    if (mode === 'add') {
      insertData.mutate(contactFormData)
    } else if (mode === 'edit'){
      updateData.mutate(contactFormData)
    }
    navigation.goBack()
  }
  return (
    <ScrollView style={{...styles.screen}} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.photoContainer}>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <FeatherIcon name="user" size={20} color={colors.primaryColor}/>
        </View>
        <View style={styles.fields}>
          <TextInput 
            placeholder='Title' 
            value={title} 
            onChangeText={onChangeTitle} 
            style={styles.textInput}/>
          <TextInput 
            placeholder='First Name' 
            value={firstName} 
            onChangeText={onChangeFirstName} 
            style={styles.textInput}/>
          <TextInput 
          placeholder='Middle Name' value={middleName} onChangeText={onChangeMiddleName} style={styles.textInput}/>
          <TextInput placeholder='Last Name' value={lastName} onChangeText={onChangeLastName} style={styles.textInput}/>
          <TextInput placeholder='Suffix' value={suffix} onChangeText={onChangeSuffix} style={styles.textInput}/>
          <TextInput placeholder='NickName' value={nickName} onChangeText={onChangeNickName} style={styles.textInput}/>
        </View>
      </View>
      <ContactLabel 
      onPress={onPressPhone} 
      item={phoneNewFields} 
      Icon={React.useCallback(() => <Ionicons 
      name="call-outline" size={20} 
      color={colors.primaryColor}/>, [])} 
      text="Add phone"/>
      {contactFormData?.phoneNumbers?.map(({label, number}, index) => (
        <ContactInput 
         key={index}
         data={{value: number, label, index}}
         onChangeText={onChangePhone} 
         placeholder='Add phone' 
         type='phone'
         otherChoices={otherChoices} 
         onRemove={removePhoneNumbers}/>
      ))}

      <ContactLabel 
      onPress={onPressEmail} 
      item={emailNewFields} 
      Icon={React.useCallback(() => <MaterialCommunityIcons name="email-outline" size={20} color={colors.primaryColor}/>,[])} 
      text="Add Email"/>
      {contactFormData?.emailAddresses?.map(({label, email}, index) => (
        <ContactInput 
        key={index} 
        data={{value:email, label, index}} 
        onChangeText={onChangeEmail} 
        placeholder='Add Email' 
        type='email' 
        otherChoices={otherChoices} 
        onRemove={removeEmailAddress}/>
      ))}
      <ContactLabel 
      onPress={onPressProfile} 
      item={profileNewFields} 
      Icon={React.useCallback(() => <FeatherIcon name="hash" size={20} color={colors.primaryColor}/>,[])} 
      text="Add profile"/>

      <ContactLabel 
      onPress={onPressImAddress} 
      item={imNewFields} 
      Icon={React.useCallback(() => <FeatherIcon name="message-square" size={20} color={colors.primaryColor}/>,[])} 
      text="Add IM"/>
      {contactFormData?.imAddresses?.map(({service, username}, index) => (
        <ContactInput 
        key={`value-${index}`} 
        data={{value:username, label: service, index}} 
        onChangeText={onChangeImAddress} 
        placeholder='Add IM' 
        type='im' 
        otherChoices={otherChoices} 
        onRemove={removeImAddresses}/>
      ))}
      <ContactLabel 
        onPress={onPressPostalAddress} 
        item={postalAddressesNewFields} 
        Icon={React.useCallback(() => <Ionicons name="location-outline" size={20} color={colors.primaryColor}/>,[])} 
        text="Add Address"/>
      {contactFormData?.postalAddresses?.map((value, index) => (
        <ContactAddressInput 
        key={index} 
        data={{value, index}} 
        onChangeText={onChangePostalAddress} 
        onRemove={removePostalAddress}/>
      ))}
      <ContactLabel 
      onPress={onPressJob} 
      item={jobNewFields} 
      Icon={React.useCallback(() => <FeatherIcon name="briefcase" size={20} color={colors.primaryColor}/>,[])} 
      text="Add Job"/>
      {contactFormData?.job?.map((value, index) => (
        <ContactJobInput
        key={index}
        data={{value, index}}
        onChangeText={onChangeJob}
        onRemove={removeJob}
        />
      ))}

      <ContactLabel 
      onPress={React.useCallback(() => setBirthdayModalVisible(true),[])} 
      Icon={React.useCallback(() => <FontAwesome name="birthday-cake" size={20} color={colors.primaryColor}/>,[])} 
      text="Add birthday"/>
      <CustomCalendar 
        visible={birthdayModalVisible} 
        onClose={() => setBirthdayModalVisible(false)} 
        onDayPress={onChangeBirthDay}
        data={birthday}
        />

      <ContactLabel 
      onPress={test} 
      Icon={React.useCallback(() => <FeatherIcon name="calendar" size={20} color={colors.primaryColor}/>,[])} 
      text="Add Date"/>


      <ContactLabel 
        onPress={onPressUrl}
        item={urlsNewFields}
        Icon={React.useCallback(() => <FeatherIcon name="link-2" size={20} color={colors.primaryColor}/>,[])} 
        text="Add URL"/>
      {contactFormData?.urls?.map(({label, url}, index) => (
        <ContactInput 
        key={index} 
        data={{value: url, label, index}} 
        onChangeText={onChangeUrl} 
        placeholder='Add URL' 
        type='url' 
        otherChoices={otherChoices} 
        onRemove={removeUrls}/>
      ))}
      
      <ContactLabel 
        onPress={onPressRelationship} 
        item={relationshipNewFields}
        Icon={React.useCallback(() => <FeatherIcon name="user" size={20} color={colors.primaryColor}/>,[])} 
        text="Add Relationship"/>
      {contactFormData?.relationship?.map(({label, relationship}, index) => (
        <ContactInput 
        key={index} 
        data={{value: relationship, label, index}} 
        onChangeText={onChangeRelationship} 
        placeholder='Add Relationship' 
        type='relationship' 
        otherChoices={otherChoices} 
        onRemove={removeRelationship}/>
      ))}

      <ContactLabel onPress={test} Icon={React.useCallback(() => <FeatherIcon name="tag" size={20} color={colors.primaryColor}/>,[])} text="Add or remove tags"/>

      <ContactLabel onPress={onPressNote} item={''} Icon={React.useCallback(() => <FeatherIcon name="file-text" size={20} color={colors.primaryColor}/>,[])} text="Add note"/>
      {contactFormData?.notes?.map((note, index) => (
        <ContactInput 
        key={index} 
        data={{value: note, index}} 
        onChangeText={onChangeNote} 
        placeholder='Add Note' 
        type='note' 
        otherChoices={otherChoices} 
        onRemove={removeNote}/>
      ))}
    </ScrollView>
  )
}

const ContactFormWrapper = () => {
  return (
    <ContactProvider>
      <AddContact/>
    </ContactProvider>
  )
}

export default ContactFormWrapper

const styles = StyleSheet.create({
  screen:{
    flex:1,
    paddingHorizontal:16,
  },
  photoContainer:{
    width:'100%',
    marginBottom:20,
  },
  inputContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  icon:{
    paddingVertical:6,
    paddingRight:14
  },
  fields:{
    flex:1
  },
  textInput :{
    padding:0,
    margin:0,
  },
})
  