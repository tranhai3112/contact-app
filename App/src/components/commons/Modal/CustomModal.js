import React from 'react'
import {Modal, Pressable, View} from 'react-native'

const CustomCalendar = ({visible, children}) => {
  return (
    <Modal visible={visible} animationType='fade' transparent={true} style={{flex:1}}>
        <Pressable style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={{minWidth:200, borderRadius:20, maxWidth:'100%', justifyContent:'center', alignItems:'center', backgroundColor:'#fff', padding:12}}>
                {children}
            </View>
        </Pressable>
    </Modal>
  )
}

export default CustomCalendar