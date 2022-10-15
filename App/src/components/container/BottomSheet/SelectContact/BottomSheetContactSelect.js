import React, { useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useRQGlobalState, key } from '../../../../../client';
import FeatherIcon from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View, StyleSheet, TouchableHighlight, Pressable } from 'react-native';
import {Text, Divider} from '@ui-kitten/components'
import colors from '../../../../constants/colors';
import {useDeleteContacts} from '../../../../Api/Contact/ContactHooks'
import CustomModal from '../../../commons/Modal/CustomModal';
import CustomBackdrop from '../CustomBackDrop';

const BottomSheetContactSelect = () => {
  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ['25%','25%'], []);
  const [bottomSheet, setBottomSheet] = useRQGlobalState(key.BottomSheetSelectContact, -1)
  const [contactsSelected, setContactsSelected] =  useRQGlobalState(key.ContactsSeleted, [])
  const deleteContacts = useDeleteContacts()
  const [visible, setVisible] = useState(false)
  const handleSheetChanges = React.useCallback((index) => {
    setBottomSheet(index)
  }, []);
 
  const onShowModal = React.useCallback(() => {
    setVisible(true)
  }, [])

  const onExit = React.useCallback(() => {
    setVisible(false)
    bottomSheetRef.current?.close()
  }, [])

  const onOk = () => {
    deleteContacts.mutate(contactsSelected, {
      onSuccess:() => {
        bottomSheetRef.current?.close()
        setContactsSelected([])
        setVisible(false)
      }
    })
  }

  //force close bottom sheet
  useFocusEffect(React.useCallback(() => {
    return () => {
      return bottomSheetRef.current?.close()
    }
  },[]))

  return (
    <>
    <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        enableHandlePanningGesture
        index={bottomSheet} //initiate with close state
        snapPoints={snapPoints} 
        onChange={handleSheetChanges}
        backdropComponent={CustomBackdrop}
      >
        <View style={styles.contentContainer}>
          <View style={styles.contentHeader}>
          <Text category='s1'> {contactsSelected?.length} Selected </Text>
          </View>
          <Divider/>
          <SelectItem 
            title='Send email' 
            Icon={() => <FeatherIcon name="mail" size={20} color={colors.primaryColor}/>}
            onPress={() => {}}
          />
          <SelectItem 
            title='Delete' 
            Icon={() => <AntDesign name="delete" size={20} color={colors.primaryColor}/>}
            onPress={onShowModal}
          />
        </View>
    </BottomSheet>
    <CustomModal visible={visible} >
      <View style={styles.modalContainer}>
        <Text category='s1'>Delete {contactsSelected?.length} contacts?</Text>
      </View>
      <Divider/>
      <View style={{justifyContent:'space-between', flexDirection:'row', paddingTop:10}}>
        <Pressable onPress={onExit} style={{paddingHorizontal:20}}>
            <Text category={'s1'} style={{color:colors.primaryColor}}>Huy</Text>
        </Pressable>
        <Pressable onPress={onOk} style={{paddingHorizontal:20}}>
            <Text category={'s1'} style={{color:colors.primaryColor}}>Ok</Text>
        </Pressable>
      </View>
    </CustomModal>
    </>
        
  )
}

const SelectItem = ({onPress, title, Icon}) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.contentVertical} underlayColor='#ccc' >
      <>
      <View style={styles.contentIcon}>
          <Icon/>
      </View>
      <View style={styles.contentText}>
          <Text category='s1'>{title}</Text>
      </View>
      </>
    </TouchableHighlight>
  )
  
}

export default BottomSheetContactSelect


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  contentHeader:{
    paddingLeft:55,
    paddingBottom:20
  },
  contentVertical:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:12,
  },
  contentIcon:{
    marginRight:20
  },
  contentText:{
    flex:1
  },
});