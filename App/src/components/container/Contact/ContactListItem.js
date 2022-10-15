import React from 'react'
import {View, StyleSheet, TouchableHighlight } from 'react-native'
import { Text } from '@ui-kitten/components'
import Avatar from '../../commons/Avatar'
import { useNavigation } from '@react-navigation/native'
import fontStyles from '../../../Utils/size'
import { useRQGlobalState, key } from '../../../../client'


const ContactItem = ({item, onLongPress}) => {
  const navigation = useNavigation()
  const isSelected = React.useRef(false)
  const {phoneNumbers, firstName} = item

  const [contactsSelected, setContactsSelected] = useRQGlobalState(key.ContactsSeleted, []) 
  const [, setContact] = useRQGlobalState(key.Contact, {}) 
  const [isContactHeaderSelectedShown, setIsContactHeaderSelectedShown] = useRQGlobalState(key.ContactHeaderSelected, false)

  const onPressHandle = () => {
    if (isContactHeaderSelectedShown) {
      setContactsSelected((prevState) => {
        if (isSelected.current) {
          isSelected.current = false
          return prevState.filter((id) => id !== item.id)
        } else {
          isSelected.current = true
          return [...prevState, item.id]
        }
      })
    } else {
      setContact(item)
      navigation.navigate('AddContact', {EditTitle: 'Edit Contact', mode:'edit'})
    }
  }
  
  const onLongPressHandle = () => {
    if(!contactsSelected.length) {
      isSelected.current = true
      setContactsSelected([item.id])
    }
    if (isContactHeaderSelectedShown) {
      setContactsSelected((prevState) => {
        if (isSelected.current) {
          isSelected.current = false
          return prevState.filter((id) => id !== item.id)
        } else {
          isSelected.current = true
          return [...prevState, item.id]
        }
      })
    } 
    onLongPress() //show header
  }

  React.useEffect(() => {
    if(!contactsSelected.length) {
      setIsContactHeaderSelectedShown(false)
      isSelected.current = false
    }
  }, [contactsSelected])

  return (
    <TouchableHighlight style={styles.container} onPress={onPressHandle} onLongPress={onLongPressHandle} underlayColor='#ccc'>
      <>
        <View >
          <Avatar size={40} isSelected={isSelected.current}/>
        </View>
        <View style={styles.info}>
          <Text category='label' style={fontStyles.label}>{firstName}</Text>
          <Text category='p1' style={fontStyles.label}>{phoneNumbers?.length > 0 ? phoneNumbers[0].number : null}</Text>
        </View>
      </>
    </TouchableHighlight>
  )
}

export default React.memo(ContactItem)

const styles = StyleSheet.create({
  container: {
    marginLeft:30,
    marginBottom:6,
    paddingLeft:10,
    paddingVertical:4,
    flexDirection:'row',
    alignItems:'center'
  },
  info: {
    marginLeft:16
  }
})