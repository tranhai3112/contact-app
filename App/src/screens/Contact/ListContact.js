import React from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import { Text } from '@ui-kitten/components';
import FloatButton from '../../components/commons/Button/FloatButton'
import ContactListItem from '../../components/container/Contact/ContactListItem';
import ContactItemSelected from '../../components/container/Header/ContactItemSelected';
import DrawerDefaultHeader from '../../navigation/Drawer/DrawerDefaultHeader';

import {useRQGlobalState, key} from '../../../client'

import formatData from '../../Utils/formatContactSectionListData'

import { useGetContacts } from '../../Api/Contact/ContactHooks';
import fontStyles from '../../Utils/size'

const ListContact = ({navigation}) => {
  const [sections, setSections] = React.useState([])
  const [contacts, setContacts] = useGetContacts()
  const [showContactHeaderSelected, setShowContactHeaderSelected] = useRQGlobalState(key.ContactHeaderSelected, false)
  const [bottomSheet, setBottomSheet] = useRQGlobalState(key.BottomSheetNavigator, -1)
  const showHeader = React.useCallback(() => {
    setShowContactHeaderSelected(true)
  }, [])
  
  React.useEffect(() => {
    if(contacts?.data?.data) {
      setSections(formatData(contacts.data.data))
      setContacts(contacts.data.data)
    }
  }, [contacts])
  React.useLayoutEffect(() => {
    // console.log(showContactHeaderSelected);
    if(showContactHeaderSelected){
      navigation.getParent('drawerNavigator').setOptions({
        header: () => (
          <ContactItemSelected />
        )
      })
    } else {
      navigation.getParent('drawerNavigator').setOptions({
        header: () => (
          <DrawerDefaultHeader />
        )
      })
    }
  }, [showContactHeaderSelected])
  return (
      <View style={styles.container}>
      <FloatButton icon={'pluscircle'} onPress={() => setBottomSheet(1)} size={40} color='#329da8'/>
      <SectionList
        renderItem={({item}) => <ContactListItem item={item} onLongPress={showHeader}/>}
        stickySectionHeadersEnabled
        
        renderSectionHeader={({section}) => <View style={styles.sectionHeader}>
          <Text appearance='hint' style={fontStyles.label}>{section.title}</Text>
        </View>}
        sections={sections}
      />
    </View>
  );
}


export default ListContact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
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
    padding:20

  },
  contentIcon:{
    marginRight:20
  },
  contentText:{
    flex:1
  },
  sectionHeader:{
    width:40,
    height:40,
    position:'absolute',
    top:5
  }
});