import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useRQGlobalState, key } from '../../../../../client';
import { useNavigation } from '@react-navigation/native';
import BottomSheetItem from './BottomSheetItem';
import CustomBackdrop from '../CustomBackDrop';

const BottomSheetContainer = () => {
  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ['50%','50%'], []);
  const [bottomSheet, setBottomSheet] = useRQGlobalState(key.BottomSheetNavigator, -1)
  const navigation = useNavigation()
  const handleSheetChanges = React.useCallback((index) => {
      setBottomSheet(index)
    }, []);
  const navigateToAddContact = (to) => {
    bottomSheetRef.current.close()
    navigation.navigate(to)
  }
  //force close bottom sheet
  useFocusEffect(React.useCallback(() => {
    return () => {
      return bottomSheetRef.current?.close()
    }
  },[]))
  return (
        <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        enableHandlePanningGesture
        index={bottomSheet} //initiate with close state
        snapPoints={snapPoints} 
        animatedIndex={bottomSheet}
        onChange={handleSheetChanges}
        backdropComponent={CustomBackdrop}
      >
        {['AddContact'].map((item,index) => (
        <BottomSheetItem onPress={React.useCallback(() => navigateToAddContact(item),[])} key={index}/>
        ))}
      </BottomSheet>
  )
}

export default BottomSheetContainer