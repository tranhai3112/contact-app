import React, { useCallback, useMemo, useRef, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import {Text} from '@ui-kitten/components'
import {Divider} from '@ui-kitten/components'
import BottomSheet from '@gorhom/bottom-sheet';
import FloatButton from '../../components/commons/Button/FloatButton'

const Call = () => {
  const bottomSheetRef = useRef(null);
  const [bottomSheet, setBottomSheet] = useState(-1)
  // variables
  const snapPoints = useMemo(() => ['50%','50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    setBottomSheet(index)
  }, []);

  const toggleBottomSheet = () => {
    setBottomSheet(+!bottomSheet)
  }
  // renders
  return (
    <View style={styles.container}>
      <FloatButton icon={'pluscircle'} onPress={toggleBottomSheet} size={40} color='#329da8'/>
      {/* <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        enableHandlePanningGesture
        index={bottomSheet} //initiate with close state
        snapPoints={snapPoints} 
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text category='s1'> Create </Text>
            </View>
            <Divider/>
            <TouchableHighlight onPress={() => {}} style={styles.contentVertical} underlayColor='#ccc'>
              <>
              <View style={styles.contentIcon}>
                <FeatherIcon name='user' color='#329da8' size={18}/>
              </View>
              <View style={styles.contentText}>
                <Text category='s1'>Contact</Text>
              </View>
              </>
            </TouchableHighlight>
        </View>
      </BottomSheet> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
  }
});

export default Call