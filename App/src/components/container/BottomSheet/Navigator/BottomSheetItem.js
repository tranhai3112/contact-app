import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import {Text} from '@ui-kitten/components'
import {Divider} from '@ui-kitten/components'
const BottomSheetItem = ({onPress}) => {
  return (
    <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
        <Text category='s1'> Create </Text>
        </View>
        <Divider/>
        <TouchableHighlight onPress={onPress} style={styles.contentVertical} underlayColor='#ccc' >
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
  )
}

export default BottomSheetItem

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
      padding:20
  
    },
    contentIcon:{
      marginRight:20
    },
    contentText:{
      flex:1
    }
  });