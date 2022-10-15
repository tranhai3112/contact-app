import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AndesignIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import colors from '../../../constants/colors'
import { Text } from '@ui-kitten/components'

import { useRQGlobalState, key } from '../../../../client'

const ContactItemSelected = () => {
  const [_, setVisible] = useRQGlobalState(key.ContactHeaderSelected, false)
  const [contactsSelected, setContactsSelected] = useRQGlobalState(key.ContactsSeleted, []) 
  const [, setBottomSheet] = useRQGlobalState(key.BottomSheetSelectContact, -1)

  const closeHeader = React.useCallback(() => {
    setVisible(false)
    setContactsSelected([])
  }, [])
  const showBottomSheet = React.useCallback(() => {
    setBottomSheet(1)
  },[])
  return (
    <View style={styles.container}>
        <AndesignIcon name='close' size={20} color={colors.primaryColor} onPress={closeHeader}/>
        <View style={{marginLeft:20,flex:1}}>
            <Text category='h6'>{contactsSelected?.length} selected</Text>
        </View>
        <FeatherIcon style={{paddingHorizontal:6}} name='tag' size={20} color={colors.primaryColor}/>
        <EntypoIcon 
          style={{paddingHorizontal:6}} 
          onPress={showBottomSheet}
          name='dots-three-vertical' 
          size={20} color={colors.primaryColor}/>
    </View>
  )
}

export default ContactItemSelected

const styles = StyleSheet.create({
  container: {
    height:50,
    width:'100%',
    backgroundColor:'#fff',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:14,
    elevation:14,
    shadowColor:'#000',
    shadowOpacity:0.4,
    shadowRadius:8,
    shadowOffset:{
      width:0,
      height:14,
    },
  }
})